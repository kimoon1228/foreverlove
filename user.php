<?php
   // echo "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/".$_GET["summonerName"]."?api_key=RGAPI-d43c7977-b06e-4638-9677-448266f87351"
    echo file_get_contents("https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/".$_GET["summonerName"]."?api_key=RGAPI-d43c7977-b06e-4638-9677-448266f87351");
?>