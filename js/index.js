//tab縮排
$(document).delegate('textarea', 'keydown', function (e) {
   var keyCode = e.keyCode || e.which;

   if (keyCode == 9) {
      e.preventDefault();
      var start = $(this).get(0).selectionStart;
      var end = $(this).get(0).selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      $(this).val($(this).val().substring(0, start)
              + " " + " " + " "
              + $(this).val().substring(end));

      // put caret at right position again
      $(this).get(0).selectionStart =
              $(this).get(0).selectionEnd = start + 3;
   }
});

$(document).ready(function () {
   var $code_textarea = $('#code-textarea');

   var $code = $('#code>.well');
   var $result = $('#result>.well');
   var $result_html = $('#result-html');
   var $html_textarea = $('#html-textarea');
   var $iframe = $('iframe');
   $html_textarea.val('');

   var $loading = $('#loading,#loading2');

   var $btn_run = $('.btn-run');
   var $btn_stop = $('.btn-stop');
   var $btn_reset = $('.btn-reset');
   var $btn_extend = $('.btn-extend');

   var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });



   var request;

   //執行程式碼
   $btn_run.click(function () {
      $loading.stop().animate({opacity: 1});
      $result.stop().animate({opacity: 0.8});
      $result_html.stop().animate({opacity: 0.8});
      $html_textarea.val('');
      $.post('run.php', {
         code: $code_textarea.val(),
         id: id
      }, function () {
         $btn_run.addClass('disabled');
         $btn_stop.removeClass('disabled');
         $iframe.attr('src', 'output_' + id + '.php');
         request = $.get('output_' + id + '.php', function (data) {
            //$result.html(data);
            $html_textarea.val(data);
            $loading.stop().animate({opacity: 0});
            $result_html.stop().animate({opacity: 1});
         });

      });
   });

   document.getElementById('iframe').onload = function () {
      $result.stop().animate({opacity: 1});
      $btn_run.removeClass('disabled');
      $btn_stop.addClass('disabled');
   };

   //停止程式
   $btn_stop.click(function () {
      swal({
         title: "確定要中止請求程式？",
         text: "對伺服器的請求將會中止。",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "停止",
         cancelButtonText: "取消",
         closeOnConfirm: false
      },
      function () {
         swal({
            title: "請求已中止",
            type: "success",
            confirmButtonText: "確定"
         });
         $loading.stop().animate({opacity: 0});
         $result.stop().animate({opacity: 1});
         $result_html.stop().animate({opacity: 1});
         request.abort();
         $btn_run.removeClass('disabled');
         $btn_stop.addClass('disabled');
      });
   });

   //重置程式碼
   $btn_reset.click(function () {
      swal({
         title: "確定要重置程式碼？",
         text: "程式碼將會還原到該頁投影片原本的狀態。",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "重置",
         cancelButtonText: "取消",
         closeOnConfirm: false
      },
      function () {
         swal({
            title: "重置完成",
            type: "success",
            confirmButtonText: "確定"
         });
         read_code();
      });
   });

   var $extend_toolbar = $('#extend-toolbar');
   var $overlay = $('#overlay');

   $overlay.click(function () {
      var $sw_alert = $('.sweet-alert');
      if ($code.hasClass('extend') && $result.hasClass('extend')) {
         $code.removeClass('extend');
         $result.removeClass('extend');
         $sw_alert.removeClass('extend');
         $extend_toolbar.css('display', 'none');
         $result_html.css('display', 'none');

         $overlay.animate({opacity: 0}, 300, function () {
            $overlay.css('display', 'none');
         });
      }
   });

   //展開/收起程式碼
   $btn_extend.click(function () {
      var $sw_alert = $('.sweet-alert');
      if (!$code.hasClass('extend') && !$result.hasClass('extend'))
      {
         $overlay.css({display: 'block', opacity: 0}).animate({opacity: 1}, 300);
         $code.addClass('extend');
         $result.addClass('extend');
         $sw_alert.addClass('extend');
         $extend_toolbar.css('display', 'block');
         $result_html.css('display', 'block');
      } else {
         $code.removeClass('extend');
         $result.removeClass('extend');
         $sw_alert.removeClass('extend');
         $extend_toolbar.css('display', 'none');
         $result_html.css('display', 'none');
         $overlay.animate({opacity: 0}, 300, function () {
            $overlay.css('display', 'none');
         });
      }
   });



   //換頁
   var $slide = $('#slide');
   var $dropdown_group = $('#page-selector>.btn-group');
   var $dropdown_button = $dropdown_group.children('button');
   var $dropdown_menu = $dropdown_group.children('.dropdown-menu');
   var page_num = 1;
   read_code();

   $dropdown_group.on('shown.bs.dropdown', function () {
      var $active_li = $dropdown_menu.find('li>a.active').parent();
      var $first_li = $dropdown_menu.find('li:first-child');
      $dropdown_menu.animate({scrollTop: $active_li.offset().top - $first_li.offset().top}, 0);
   });

   $slide.on('slide.bs.carousel', function (e) {
      var $item = $(e.relatedTarget);
      page_num = $item.data('page-num');
      read_code();


      //下拉式選單
      $dropdown_menu.find('li>a.active').removeClass('active');
      $dropdown_menu.find('li:nth-child(' + page_num + ')>a').addClass('active');
      $dropdown_button.html('page ' + page_num + '<span class="caret"></span>');

      //章節列表
      var $chapter_list = $('#chapter-list>table tr');
      $chapter_list.filter('.active').removeClass('active');
      for (var i = 0; i <= $chapter_list.length; i++) {
         var start = $chapter_list.eq(i).data('slide-to') + 1;
         var end = $chapter_list.eq(i + 1).data('slide-to');
         if (!$chapter_list.eq(i).is($chapter_list.filter(':last-child'))) {
            if (page_num >= start && page_num <= end) {
               $chapter_list.eq(i).addClass('active');
               break;
            }
         }
         else {
            if (page_num >= start) {
               $chapter_list.eq(i).addClass('active');
               break;
            }
         }
      }
   });

   //讀取程式碼
   function read_code() {
      $code_textarea.val('');
      $iframe.attr('src', '');
      $html_textarea.val('');
      $.post('delete.php', {
         id: id
      });
      $.get('slide/投影片' + page_num + '.txt', function (data) {
         $code_textarea.val(data);
      });
   }

   $(window).bind('beforeunload', function (e) {
      return '確定要離開?';
   });
   $(window).unload(function () {
      $.post('delete.php', {
         id: id
      });
   });

});


