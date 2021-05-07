<?php
   // echo "https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/".$_GET["puuid"]."ids?count=".$_GET["count"]."&api_key=RGAPI-8d19bb19-e803-4649-84fe-94a493fc80c7";
   echo file_get_contents("https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/".$_GET["puuid"]."/ids?count=".$_GET["count"]."&api_key=RGAPI-d43c7977-b06e-4638-9677-448266f87351");
?>