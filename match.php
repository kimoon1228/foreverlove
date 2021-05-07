<?php
   echo file_get_contents("https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/".$_GET["puuid"]."/ids?count=20&api_key=RGAPI-d43c7977-b06e-4638-9677-448266f87351");
?>