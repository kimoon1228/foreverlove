<?php
   echo file_get_contents("https://www.youtube.com/results?search_query=".urlencode($_GET["ygyWord"]))
//    echo file_get_contents("https://www.youtube.com/results?search_query=".urlencode("쿄쥬로"))
?>