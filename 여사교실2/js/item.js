var v_debug = false;
        var v_item;
        var v_ajax_1 = new XMLHttpRequest();
        v_ajax_1.open("get","./set5/items.json",true);
        v_ajax_1.onreadystatechange = function(){
            if(v_ajax_1.readyState==4 && v_ajax_1.status == 200){
                // console.log(JSON.parse(v_ajax.responseText));
                v_item=JSON.parse(v_ajax_1.responseText);
                 console.log(v_item);
               f_item() 
            }
        }
        v_ajax_1.send();

        function f_item(){
            for(var i=9; i<v_item.length; i++){
                if(i>53&&i<63){
                    continue
                }
                f_itemMake(v_item[i])
            }
        }
        
        function f_itemMake(p_item){
                var v_div = document.createElement("div")
                v_div.setAttribute("id", p_item.id)
                v_div.setAttribute("class","cl_item")
                v_div.setAttribute("data-toggle","tooltip");
                v_div.setAttribute("data-placement","auto")
                v_div.setAttribute("v_name",p_item.id)
                v_div.style.backgroundImage= "url(./set5/items/"+p_item.id+".png)";
                 v_div.title = p_item.name;
                v_div.draggable=true;
                v_div.ondragstart = function(){
                    event.dataTransfer.setData("item",event.target.id);
                    console.log(event.target)
                }
                v_itemSlot.appendChild(v_div)    
           }

        