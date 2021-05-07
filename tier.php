<?php
   echo file_get_contents("https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/".$_GET["id"]."?api_key=RGAPI-d43c7977-b06e-4638-9677-448266f87351");
?>