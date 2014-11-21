<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <title>Laravel Framework 講座系列活動─前導課程</title>
      <link href="css/bootstrap.min.css" rel="stylesheet">
      <link href="css/material-wfont.css" rel="stylesheet">
      <link href="css/sweet-alert.css" rel="stylesheet">
      <link href="css/index.css" rel="stylesheet">

      <script src="js/jquery-1.10.2.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/material.min.js"></script>
      <script src="js/sweet-alert.js"></script>
      <script src="js/index.js"></script>
   </head>
   <body>
      <?php
      $slide_page = 27;
      ?>
      <div class="container">
         <div class="row">
            <div id="slide" class="col-xs-9">
               <div class="well">
                  <div id="slide-carousel" class="carousel slide" data-ride="carousel" data-page="<?= $slide_page ?>" data-interval="false" data-wrap="false">

                     <!-- Wrapper for slides -->
                     <div class="carousel-inner" role="listbox">
                        <?php for ($i = 1; $i <= $slide_page; $i++): ?>
                           <div class="item <?= ($i == 1) ? 'active' : '' ?>" data-page-num="<?= $i ?>">
                              <img id="slide-img" src="slide/投影片<?= $i ?>.PNG" width="100%">
                           </div>
                        <?php endfor; ?>
                     </div>

                     <!-- Controls -->
                     <a class="left carousel-control" href="#slide-carousel" role="button" data-slide="prev" onfocus="this.blur()">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                        <span class="sr-only">Previous</span>
                     </a>
                     <a class="right carousel-control" href="#slide-carousel" role="button" data-slide="next" onfocus="this.blur()">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                        <span class="sr-only">Next</span>
                     </a>
                  </div>
               </div>
            </div>

            <div id="toolbar" class="col-xs-3">
               <div class="well">

                  <div id="page-selector" class="btn-group visible-xxs-inline-block">
                     <button class="btn btn-info" type="button" href="#slide-carousel" role="button" data-slide="prev" onfocus="this.blur()">
                        <i class="mdi-navigation-arrow-back"></i>
                     </button>
                     <div class="btn-group">
                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                           page 1<span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                           <?php for ($i = 1; $i <= $slide_page; $i++): ?>
                              <li><a class="<?= ($i == 1) ? 'active' : '' ?>" data-target="#slide-carousel" data-slide-to="<?= ($i - 1) ?>"><?= $i ?></a></li>
                           <?php endfor; ?>
                        </ul>
                     </div>
                     <button class="btn btn-info" type="button" href="#slide-carousel" role="button" data-slide="next" onfocus="this.blur()">
                        <i class="mdi-navigation-arrow-forward"></i>
                     </button>
                  </div>

                  <div id="chapter-list">
                     <table class="table table-hover table-bordered">
                        <tr data-target="#slide-carousel" data-slide-to="0" class="active"><td>首頁</td></tr>
                        <tr data-target="#slide-carousel" data-slide-to="2"><td>PHP基礎</td></tr>
                        <tr data-target="#slide-carousel" data-slide-to="6"><td>變數</td></tr>
                        <tr data-target="#slide-carousel" data-slide-to="12"><td>流程控制</td></tr>
                        <tr data-target="#slide-carousel" data-slide-to="16"><td>函數</td></tr>
                        <tr data-target="#slide-carousel" data-slide-to="19"><td>狀態管理</td></tr>
                        <tr data-target="#slide-carousel" data-slide-to="25"><td>練習</td></tr>
                     </table>
                  </div>
                  <hr>
                  <a class="btn btn-primary btn-run">執行</a>
                  <a class="btn btn-danger btn-stop disabled">中止</a>
                  <a class="btn btn-success btn-reset">重置</a>
                  <a class="btn btn-warning btn-extend">展開</a>
               </div>
            </div>
         </div>
         <div class="row">
            <div id="code" class="col-xs-6">
               <div class="well">
                  <textarea id="code-textarea" wrap="off" spellcheck="false"></textarea>
               </div>
            </div>
            <div id="result" class="col-xs-6">
               <div class="well">
                  <iframe id="iframe" scrolling="auto" src="test2.php"></iframe>
               </div>
               <img id="loading" src="img/ajax-loader.gif">
               
            </div>

            <div id="result-html" class="well">
               <textarea id="html-textarea" wrap="off" spellcheck="false"></textarea>
               <img id="loading2" src="img/ajax-loader.gif">
            </div>

            <div id="extend-toolbar" class="well">
               <button class="btn btn-info" type="button" href="#slide-carousel" role="button" data-slide="prev" onfocus="this.blur()">
                  <i class="mdi-navigation-arrow-back"></i>
               </button>
               <button class="btn btn-info" type="button" href="#slide-carousel" role="button" data-slide="next" onfocus="this.blur()">
                  <i class="mdi-navigation-arrow-forward"></i>
               </button>
               <a class="btn btn-primary btn-run btn-raised">執行</a>
               <a class="btn btn-danger btn-stop disabled btn-raised">中止</a>
               <a class="btn btn-success btn-reset btn-raised">重置</a>
               <a class="btn btn-warning btn-extend btn-raised">收起</a>

            </div>
         </div>
      </div>
      <div id="overlay"></div>
   </body>
</html>