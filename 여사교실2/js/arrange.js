
var v_debug = false;
var v_num=0;
var num =0;
var item_num =0;
function f_arrange(){
    for(var i=1; i<=4; i++){
        for(var j = 1; j<=7; j++){
        $("<div>").css("grid-column-start",j)
                  .css("grid-column-end", j+1 )
                  .css("grid-row-start",i)
                  .css("grid-row-end",i+1)
                  .addClass("cl_pan arr"+i)
                  .appendTo($(".arrange"))
                  .on("dragover",function(){
                    event.preventDefault();
                    this.style.backgroundColor = "indigo"
                  }).on("dragleave",function(){
                    event.preventDefault();
                    this.style.backgroundColor ="white"
                  })
                  .on("drop",function(){
                      event.preventDefault();
                      if(v_debug){
                          console.log(this) 
                      }
                      f_chamevent(this);
                  })
                  .on("dragstart",function(){ // 배치된 챔피언을 다시 셋팅 하려할때
                    event.dataTransfer.setData("cham1",event.target.id);
                  })
                  
        }
    }
}
// 챔피언 배치 함수 
function f_chamevent(p_this){
    if(event.dataTransfer.getData("new")){
        p_this.style.backgroundColor ="white"
        return alert("아이템을 장착하려면 챔피언을 먼저 배치해주세요")
    }
    //data가 cham 으로 셋팅된  data를 받을때
    if(event.dataTransfer.getData("cham")){ 
        var v_id= event.dataTransfer.getData("cham");
        if(event.dataTransfer.getData("new")){
            return;     
        }

        // 받은 데이터의 복사본 만듬
        var v_clone = document.getElementById(v_id).cloneNode(true);
        console.log("받은값", v_clone)

        //디버그 함수
        if(v_debug){
            console.log(p_this) // 받아지는 판 하나 리턴
            console.log(v_clone) // 복사된 값 
            console.log(p_this.children[0])// 판안에 들어가 있는 값 리턴
        }

        // 복사본 데이터 셋팅
        v_clone.style.width = "80px";
        v_clone.style.height = "80px";
        v_clone.setAttribute("class","cl_unit")
        v_clone.id= v_num
        v_num++;// 들어갈때마다 아이디 값 증가

        // 판안에 들어가 있는게 있으면 
        if(p_this.children[0]){
            p_this.innerHTML="";
            p_this.appendChild(v_clone)
            return;
        }
        
        // 판안에 넣기
         p_this.appendChild(v_clone)
    }

    // 배치판안에 셋팅된 기물 옮길때
    if(event.dataTransfer.getData("cham1")){
        var v_id = event.dataTransfer.getData("cham1");
         var v_clone = document.getElementById(v_id)
         console.log(v_clone)
        p_this.appendChild(v_clone);
        // 판안에 들어가 있는게 있으면 
        if(p_this.children[0]){
            p_this.innerHTML="";
            p_this.appendChild(v_clone)
            return;
        }
    }
    var v_divnum =1;
    // 아이템 넣기
    if(event.dataTransfer.getData("item")){
        console.log(v_itemMixed.children.length)
        // 챔피언이 없는 판에 넣을때
        if(!p_this.children[0]){
            p_this.style.backgroundColor ="white"
            return alert("아이템을 장착하려면 챔피언을 먼저 배치해주세요")
        }
        // 아이템 div 넣을 div상자 만들기
        if(!p_this.children[0].children.length){
            var item_list = document.createElement("div");
            item_list.setAttribute("class","item_list");
            item_list.setAttribute("id", "_showing"+v_divnum)
            item_list.ondragstart =function(){
                event.dataTransfer.setData("new",event.target.id)
            }
            p_this.children[0].appendChild(item_list) 
            v_divnum++
            console.log(p_this)
        }

        var v_item = event.dataTransfer.getData("item")
        var v_itemClone = document.getElementById(v_item).cloneNode(true);
        v_itemClone.setAttribute("class","inneritem");
        v_itemClone.setAttribute("id",item_num)

        // item div 변수선언
        var v_itemdiv = p_this.children[0].children[0]
        console.log(v_itemdiv)
        // 도적의 장갑 if문
        if(v_itemClone.title =="Thief's Gloves"){
            console.log(v_itemClone.title)
            if(v_itemdiv.childElementCount==0){
                v_itemdiv.appendChild(v_itemClone);
                item_num++;
                f_itemshowing(v_itemClone)
                v_itemdiv.childElementCount=3
                return;
            }
            if(v_itemdiv.childElementCount>0){
                return alert("도적의 장갑 아이템은 3칸의 슬롯이 필요합니다.")
            }
        }
        if(v_itemdiv.childElementCount==1){
            if(v_itemdiv.children[0].title== "Thief's Gloves"){
                return alert("도적의 장갑 아이템은 3칸의 슬롯이 필요합니다.")
            }
        }
        // 아이템 총 갯수 제한
        if(v_itemdiv.childElementCount>2){
            return alert("아이템은 3개까지만 장착 가능합니다.")
        }
        v_itemdiv.appendChild(v_itemClone);
        f_itemshowing(v_itemClone)
        item_num++
    }


}





var v_arslot = document.querySelectorAll(".cl_pan")

