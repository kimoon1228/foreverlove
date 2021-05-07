var push_sy=[]

function f_viewsy(p_clone){
    //  시너지 표기 배열에 담기 전에 중복체크
    for(var a=0; a<push_sy.length; a++){
        if(push_sy[a]==p_clone.title){
            console.log("중복값")
            return
        }
    }
        
    push_sy.push(p_clone.title)
    console.log(push_sy) // 시너지 배열
    console.log(cham.name)

}