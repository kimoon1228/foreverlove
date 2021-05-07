var v_ifrmStr = '<iframe id="id_video" width="482" height="272"  muted'
        v_ifrmStr+= 'src="" title="여사교실 video player"'
        v_ifrmStr+=  'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
        v_ifrmStr+=  "allowfullscreen> </iframe>"
        var v_src = "https://www.youtube.com/embed/"
        var v_sel = $("<select>").attr("id","id_sel")
            v_sel.appendTo("#video_sel")
        var v_first = true 
        var v_ssss = document.querySelector("#video_view")
    function f_Code(p_code){
        $.ajax({
            method:"get",
            url:"gettitle.php",
            data: "ygyCode="+p_code,
            dataType:"text",
            success:function(p_rlst){
                $("<option>").html(p_rlst)
                        .val(p_code)
                        .appendTo($("#id_sel"))
                    if(v_first){
                    v_ssss.innerHTML="";
                        $("<h3>").html(p_rlst).appendTo($("#video_view")); 
                    $(v_ifrmStr).attr("src",v_src+p_code+"?autoplay=1")
                            .appendTo($("#video_view"))
                            v_first = false
                    }
                        
            }
        })
    }

    $("form[name=name]").on("submit",function(){
        v_first = true
        $("#id_sel").empty();
        event.preventDefault(); //ajax 쓸거라서 form action 막기
        console.log($("form[name=name]").serialize());
        $.ajax({
            "type":"get",
            "url":"getSearch.php",
            data:$("form[name=name]").serialize(),
            dataType:"text",
            success:function(p_rlst){
                var v_stIndex = 0; //찾기 시작위치;
                var v_searchIndex; // 찾은 위치
                var v_codeArr = []

                //문서안에 있던 watch?v=중복없이 찾아오기
                for(;(v_searchIndex = p_rlst.indexOf("watch?v=",v_stIndex)) != -1;){
                  var v_code = p_rlst.substr(v_searchIndex+8,11) // 코드값
                    if(v_codeArr.indexOf(v_code)== -1){
                        v_codeArr.push(v_code);
                    }
                    v_stIndex = v_searchIndex +19;
                }

                // 영상코드 값 제목 가져오는 함수에 넘기기
                for(var i =0; i<v_codeArr.length; i++){
                    f_Code(v_codeArr[i])
                }

                v_sel.on("change",function(){
                     v_ssss.innerHTML="";
                    console.log(p_rlst)
                $(v_ifrmStr).attr("src",v_src+$(this).val())
                            .appendTo($("#video_view"));
                })
              
            }
        })

    })