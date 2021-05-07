var v_debug= false;

var v_cham;

// 아작스로 챔피언 데이터 불러오기
function f_ajax(){
var v_ajax = new XMLHttpRequest();
  v_ajax.open("get","./set5/champions.json",true);
  v_ajax.onreadystatechange = function(){
      if(v_ajax.readyState==4&& v_ajax.status == 200){
         console.log(JSON.parse(v_ajax.responseText)) 
          v_cham = JSON.parse(v_ajax.responseText)
          console.log(v_cham)
          f_namesort();
        }
    }
    v_ajax.send()
}

  // 챔피언 별 정보 전달 함수 
    function f_cham(){
        v_chamSlot.innerHTML ="";
        for(var i = 0; i<v_cham.length; i++){
            f_chammake(v_cham[i])
        }
    }

  // 챔피언 만들기 함수
function f_chammake(p_cham){
    var v_div = document.createElement("div");
    v_div.setAttribute("id",p_cham.name);
    v_div.setAttribute("class","cl_can");
    v_div.style.backgroundImage = "url(./set5/champions/"+p_cham.championId+".png)"
    v_div.style.borderColor = f_borderColor(p_cham.cost)
    v_div.title = p_cham.kor
    v_div.draggable=true;
    v_div.addEventListener("dragstart",function(){
        event.dataTransfer.setData("cham",event.target.id);
        console.log(event.target)
    })
    v_chamSlot.appendChild(v_div)
}

// 코스트별 테두리 지정 함수
function f_borderColor(p_cost){
    var v_bordercolor =["gray","green","blue","blueviolet","yellow"]
    return v_bordercolor[p_cost-1]
}

//코스트별 정렬 함수
function f_costsort(){
    console.log(v_cham.sort(function(a,b){
        if(a.cost>b.cost){
            return 1;
        }
        if(a.cost<b.cost){
            return -1;
        }
        return 0;
    }))
   f_cham();
}

//이름별 정렬 함수
function f_namesort(){
    v_cham.sort(function(a,b){
        if(a.kor>b.kor){
            return 1;
          }
          if(a.kor<b.kor){
              return -1;
          }
          return 0;
      })
      f_cham()
  }