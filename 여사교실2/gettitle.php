<?php
   $ygyCont = file_get_contents("https://www.youtube.com/watch?v=".$_GET["ygyCode"]);
    $stIndex = strpos($ygyCont,"<title>") ;// js의 indexof함수
    $endIndex = strpos($ygyCont,"</title>");
    echo substr($ygyCont, $stIndex+7,$endIndex-($stIndex+17));
?>