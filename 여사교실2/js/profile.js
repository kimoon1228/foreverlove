 // 검색한 소환사명 티어 구하기 
 function f_tier(p_id){
    console.log(p_id)
    $.ajax({
      type:"get",
      url:"tier.php",
      data:"id="+p_id,
      success:function(p_arg){
          console.log(JSON.parse(p_arg))
          var v_tier = JSON.parse(p_arg)
          console.log(v_tier[0].rank)
          $("<img>").attr("width",84).attr("height",84)
          .attr("src","https://cdn.lolchess.gg/images/lol/tier/"+v_tier[0].tier.toLowerCase()+"_"+f_rankreplace(v_tier[0].rank)+".png")
          .appendTo($(".profile_tier"))
          .attr("id","id_tier");
          var v_div = document.createElement("div");
          v_div.setAttribute("id","id_tier");
          v_div.innerHTML= "티어 <br>"+ v_tier[0].tier + " "+ v_tier[0].rank +"<br>"+ v_tier[0].leaguePoints+ " LP";
          $(".profile_tier").append(v_div);
          var v_gamecount = v_tier[0].wins+v_tier[0].losses // 총게임수
          $("<div>").html("게임수"+"<br>"+ v_gamecount)
          .addClass("tier")
          .appendTo($(".profile_game"));
          $("<div>").html("승리"+"<br>"+v_tier[0].wins)
            .addClass("tier")
          .appendTo($(".profile_game"));
            f_matchcount(v_gamecount)
      }
    })
  }       // 티어 구하기 끝

//Rank 데이터 치환
  function f_rankreplace(p_rank){
    if(p_rank == "I"){
      p_rank= 1;
      return p_rank
    }
    if(p_rank == "II"){
      p_rank= 2;
      return p_rank
    }
    if(p_rank == "III"){
      p_rank= 2;
      return p_rank
    }
    if(p_rank == "IV"){
      p_rank = 4;
      return p_rank
    }
  }