var v_raked=[]; // 순위 받는 배열
var v_matcharr = [] // 경기 정보 받는 배열

var v_togle = false;
// 20경기 데이터 받기
function f_match(p_puuid){
    console.log(p_puuid)
    $.ajax({
      type:"get",
      url:"match.php",
      data:"puuid="+p_puuid,
      dataType:"text",
      success:function(p_arg){
        console.log(JSON.parse(p_arg));
        var v_matchs = JSON.parse(p_arg);
            f_proxy(v_matchs,0);
        // console.log(v_matchs[0]) // 20 경기중 하나
      }
    })
  }
  
  // 비동기 함수 제어
  function f_proxy(p_matchs,p_inddex){
    f_deepmatch(p_matchs,p_inddex);
    if(p_inddex < (p_matchs.length-1)){
      setTimeout(f_proxy,150,p_matchs,++p_inddex);
    }
    
  }

  //게임 하나하나 상세정보 받기
  function f_deepmatch(p_matchs,p_inddex){
    //  console.log("체크:",p_inddex);
     var mID = p_matchs[p_inddex];
     $.ajax({
       type:"get",
       url:"deepmatch.php",
       data:"matchId="+ mID,
       success:function(p_arg){
        //  console.log(p_arg)
        // console.log(i)
          console.log(JSON.parse(p_arg).info)
         var v_match = JSON.parse(p_arg).info
        //  console.log(v_match.participants.length)
        //  console.log(v_puuid)
        if(v_raked.length==20){
          v_raked.splice(0,v_raked.length)
          v_matcharr.splice(0,v_matcharr.length)
        }
          for(var a=0; a<v_match.participants.length; a++){
              if(v_match.participants[a].puuid== v_puuid){
                //  console.log(v_match.participants[a].placement)
                 v_raked.push(v_match.participants[a].placement);
                 var v_game = {}
                 v_game.date = new Date(v_match.game_datetime);
                 v_game.info = v_match.participants[a]
                 v_matcharr.push(v_game)
                 if(v_raked.length==20){
                    f_raked();
                }
                }
                
            }
        }
    });
}// 상세 정보 받기 끝 

function f_matchdata(){
    console.log(v_matcharr)
    for(var a=0; a<v_matcharr.length; a++){
        $("<div>").addClass("match_info col-md-10")
                    .attr("id" ,"id_"+a)
        .appendTo($(".match"))  
        // 게임 날짜
        var v_date =v_matcharr[a].date
        var v_info = v_matcharr[a].info
        //게임 시간
        var min = parseInt((v_info.time_eliminated%3600)/60);
        var sec = Math.trunc(v_info.time_eliminated%60);

        //매치 날짜 데이터 출력
        $("<div>").html(v_date.getFullYear()+"."+(v_date.getMonth()+1)+"."+v_date.getDate()+"<br>"
                    +v_date.getHours()+":"+v_date.getMinutes()+"<br>"+min+":"+sec)
                .addClass("match_date")
                .appendTo($("#id_"+a));

        // 매치 등수
        $("<div>").html("#"+v_info.placement).addClass("match_ranked").appendTo($("#id_"+a))
                  .css("color",f_fontcolor(v_info.placement))

        // 매치 사용한 유닛들
                for(var b=0; b<v_info.units.length; b++){
                    $("<div>").addClass("unitinfo").attr("id","unit_"+a+"_"+b).appendTo($("#id_"+a));
                    $("<div>").addClass("unit_stars").html(f_star(v_info.units[b].tier)).appendTo($("#unit_"+a+"_"+b));
                    $("<div>").addClass("match_units").css("background-image", "url(./set5/champions/"+ v_info.units[b].character_id+".png)")
                    .css("borderColor", f_cost(v_info.units[b].character_id) ).appendTo($("#unit_"+a+"_"+b));

                    var v_items = v_info.units[b].items
                    if(v_items.length!=0){
                        console.log(v_items)
                        for(var c=0; c<v_items.length; c++){
                            $("<div>").addClass("unit_items").css("background-image", "url(./set5/items/"+f_useitem(v_items[c]) +".png)")
                            .appendTo($("#unit_"+a+"_"+b));
                        }
                    }
                }
            }
            
            // 게임날짜
            
            
        }
        var v_cham;
        var v_ajax = new XMLHttpRequest();
          v_ajax.open("get","./set5/champions.json",true);
          v_ajax.onreadystatechange = function(){
              if(v_ajax.readyState==4&& v_ajax.status == 200){
                  v_cham = JSON.parse(v_ajax.responseText)
                  console.log(v_cham)
                }
            }
            v_ajax.send()

        // 아작스로 챔피언 데이터 불러오기
        function f_cost(p_id){
          console.log(p_id)
          for(var i=0; i<v_cham.length; i++){
             if(v_cham[i].championId == p_id){
               return f_borderColor(v_cham[i].cost)
             }
          }
        }

        function f_borderColor(p_cost){
          var v_bordercolor =["gray","green","blue","blueviolet","yellow"]
          return v_bordercolor[p_cost-1]
      }

        function f_useitem(p_item){
          console.log(typeof(p_item))
          p_item = String(p_item)
            if(p_item.length==1){
              p_item= 0+p_item
            }
            return p_item
        }
        // 등수 색깔 찍기
        var v_color;
        function f_fontcolor(p_placement){
        if(p_placement==1){
          return  v_color = "#11b288";
        }
        else if(p_placement>=2&&p_placement<=4){
           return v_color = "#207ac7";
        }
        else if(p_placement>=5){
            return v_color ="#d6d6d6";
        }
    }
        // tier 함수
        function f_star(p_star){
            if(p_star==1){
                return "★";
            }
            else if(p_star==2){
                return "★★";
            }
            else if(p_star==3){
                return "★★★"
            }
        }
    

    // 최근 등수 , 차트 찍기
        function f_raked(){
          $("<div>").html("최근 20게임 등수").addClass("20_game")
          .appendTo($(".profile_rank"))
          var chartdata = [0,0,0,0,0,0,0,0]
            // console.log(v_raked)
          for(var a=0; a<v_raked.length; a++){
            if(v_raked[a]==1){
                   $("<div>").html(v_raked[a]).addClass("win")
                    .appendTo($(".profile_rank"))
                 }
                 if(v_raked[a]==2||v_raked[a]==3||v_raked[a]==4){
                  $("<div>").html(v_raked[a]).addClass("mid")
                    .appendTo($(".profile_rank"))
                 }
                 if(v_raked[a]>4){
                  $("<div>").html(v_raked[a]).addClass("low")
                    .appendTo($(".profile_rank"))
                 }
              chartdata[v_raked[a]-1] +=1
          }
            var v_chart = document.createElement("canvas");
            v_chart.setAttribute("id","myChart");
            v_profile_chart.appendChild(v_chart)
           var ctx = document.getElementById("myChart").getContext('2d');
           var myChart = new Chart(ctx,{
             type: 'bar',
             data: {
               labels :[1,2,3,4,5,6,7,8],
               datasets:[{
                 data: chartdata,
                 backgroundColor:[
                 '#11b288','#207ac7','#207ac7','#207ac7','#d6d6d6'
                 ,'#d6d6d6','#d6d6d6','#d6d6d6'
                 ],
                 borderColor:[
                 '#11b288','#207ac7','#207ac7','#207ac7','#d6d6d6'
                 ,'#d6d6d6','#d6d6d6','#d6d6d6'
                 ],
                borderWidth:1
               }]
             }
           })
           myChart.update();
           $(".profile_chart").css("backgroundColor","#eee")
           f_matchdata()
        }    // 최근 등수 , 차트 찍기 끝