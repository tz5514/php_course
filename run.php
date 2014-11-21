<?php
$myfile = fopen('output_'.$_POST['id'].'.php', 'w');
fwrite($myfile, $_POST['code']);
fclose($myfile);
