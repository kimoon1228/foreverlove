
    var v_inum = 0; 
    var tem ={}
    tem.clone =[]
    tem.showId =[];

function f_itemshowing(p_itemclone){
    for(var i=0; i<v_item.length; i++){
       console.log(String(v_item[i].id).split("").length)
        if(v_item[i].name== p_itemclone.title){
            if(String(v_item[i].id).split("").length ==2 ){
                f_noshadow(v_item[i])
            }
            if(String(v_item[i].id).split("").length ==4){
                f_shadow(v_item[i])
            }
           
        }
    }
}

function f_noshadow(p_tem){
       var tem_id = String(p_tem.id).split("")
    $("<div>").addClass("itemshowing ")
    .appendTo($(".itemMixed"))
    .attr("id",v_inum+"showing")
    $("<div>").addClass("inneritem")
            .css("background-image", "url(./set5/items/0"+tem_id[0]+".png)")
            .appendTo($("#"+v_inum+"showing"))
    $("<div>").addClass("inner")
            .html("+")
            .appendTo($("#"+v_inum+"showing"))
    $("<div>").addClass("inneritem")
            .css("background-image", "url(./set5/items/0"+tem_id[1]+".png)")
            .appendTo($("#"+v_inum+"showing"))        
    $("<div>").addClass("inner")
            .html("=")
            .appendTo($("#"+v_inum+"showing"))
    $("<div>").addClass("inneritem")
    .css("background-image", "url(./set5/items/"+tem_id[0]+tem_id[1]+".png)")
    .appendTo($("#"+v_inum+"showing"))
    tem.clone.push(p_tem);
    tem.showId.push(v_inum+"showing");    
    ++v_inum
}

function f_shadow(p_tem){
  var tem_id = String(p_tem.id).split("")
    $("<div>").addClass("itemshowing ")
    .appendTo($(".itemMixed"))
    .attr("id",v_inum+"showing")
    $("<div>").addClass("inneritem")
            .css("background-image", "url(./set5/items/100"+tem_id[2]+".png)")
            .appendTo($("#"+v_inum+"showing"))
    $("<div>").addClass("inner")
            .html("+")
            .appendTo($("#"+v_inum+"showing"))
    $("<div>").addClass("inneritem")
            .css("background-image", "url(./set5/items/100"+tem_id[3]+".png)")
            .appendTo($("#"+v_inum+"showing"))        
    $("<div>").addClass("inner")
            .html("=")
            .appendTo($("#"+v_inum+"showing"))
    $("<div>").addClass("inneritem")
    .css("background-image", "url(./set5/items/10"+tem_id[2]+tem_id[3]+".png)")
    .appendTo($("#"+v_inum+"showing"))
     tem.clone.push(p_tem);
    tem.showId.push(v_inum+"showing");    
    ++v_inum

}

