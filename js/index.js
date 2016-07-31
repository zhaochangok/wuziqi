$(function(){
	// 五子棋：
    var kongbai={};
    $(".select").on("click",function(){
        var audio =  $('audio').get(0);
        audio.play();
    	$(this).addClass("xia");
    	$(".zhezhaoyou").addClass("you");
    	$(".zhezhaozuo").addClass("zuo");
    	$(".jieshao").addClass("shang");
    })
   
    $(".renren").on("click",function(){
            $(".qipan").addClass("xia");
    	for (var i = 0; i < 15; i++) {
    		$("<b>").addClass("hang").appendTo(".changjing");
    		$("<i>").addClass("shu").appendTo(".changjing");
		for (var j = 0; j < 15; j++) {
            kongbai[i+"-"+j]={
               x:i,
               y:j
          };
			$("<div>").addClass("qizi").attr("id",i+"-"+j).data('pos',{x:i,y:j}).appendTo(".changjing");
		}
	  }
      isAi=false;
      drop();
    })
    $(".renji").on("click",function(){
        $(".qipan").addClass("xia");
        for (var i = 0; i < 15; i++) {
            $("<b>").addClass("hang").appendTo(".changjing");
            $("<i>").addClass("shu").appendTo(".changjing");
        for (var j = 0; j < 15; j++) {
            kongbai[i+"-"+j]={
               x:i,
               y:j
          };
            $("<div>").addClass("qizi").attr("id",i+"-"+j).data('pos',{x:i,y:j}).appendTo(".changjing");
        }
      }
       drop();
    })
   $(".chongxin").on("click",function(){
       window.location.reload();
   })
   $(".close").on("click",function(){
       window.close();
   })
   var jion=function(n1,n2){
       return n1+"-"+n2;
   }
   var panduan = function(pos, color) {
        var dict = {};
        for (var i in biao) {
            if (biao[i] === color) {
                dict[i] = true;
            }
        }
        var h = 1
          , s = 1
          , zx = 1
          , yx = 1;
        var tx, ty;
        //youbiao
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx, ty - 1)]) {
            h++;
            ty--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx, ty + 1)]) {
            h++;
            ty++;
        }
        // if(h>=5){
        //  return true;
        // }
        // alert(h);
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx - 1, ty)]) {
            s++;
            tx--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx + 1, ty)]) {
            s++;
            tx++;
        }
        // if(s>=5){
        //  return true;
        // }
        // alert(s)
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx - 1, ty + 1)]) {
            zx++;
            tx--;
            ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx + 1, ty - 1)]) {
            zx++;
            tx++;
            ty--;
        }
        // if(zx>=5){
        //  return true;
        // }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx - 1, ty - 1)]) {
            yx++;
            tx--;
            ty--;
        }
        tx = pos.x;
        ty = pos.y;
        while (dict[jion(tx + 1, ty + 1)]) {
            yx++;
            tx++;
            ty++;
        }
        // if(yx>=5){
        //  return true;
        // }
        return Math.max(h, s, zx, yx);
    }
   var ai = function() {
        var zuobiao;
        var max = -Infinity;
        for (var i in kongbai) {
            var weixie = panduan(kongbai[i], 'hei');
            if (weixie > max) {
                max = weixie;
                zuobiao = kongbai[i];
            }
        }
        var zuobiao2;
        var max2 = -Infinity;
        for (var i in kongbai) {
            var weixie = panduan(kongbai[i], 'bai');
            if (weixie > max2) {
                max2 = weixie;
                zuobiao2 = kongbai[i];
            }
        }
        return (max > max2) ? zuobiao : zuobiao2;
    }
    var biao = {};
    var isAi = true;
    var qizi = $('.qipan .qizi');
    var num = 0;
    var num1 = 0; 
    var timed;
    var t;
    var audiob = $('audio').get(1)
    var audiow = $('audio').get(2)
var drop = function() {
        var flag = true;
        $('.changjing .qizi').on('click', function() {
            if ($(this).hasClass('hei') || $(this).hasClass('bai')) {
                return;
            }
            var pos = $(this).data('pos');
            if (!isAi) {
                if (flag) {
                    audiob.play();
                    $(this).addClass('hei');
                    biao[pos.x + '-' + pos.y] = 'hei';
                    flag = !flag;
                    if (panduan(pos, 'hei') >= 5) {
                        alert('黑棋获胜');
                        $('.changjing .qizi').off('click');
                    }
                } else {
                    audiow.play();
                    $(this).addClass('bai');
                    biao[pos.x + '-' + pos.y] = 'bai';
                    flag = !flag;
                    if (panduan(pos, 'bai') >= 5) {
                        alert('白棋获胜');
                        $('.changjing .qizi').off('click');
                    };
                }
            } else {
                
                $(this).addClass('hei')
                biao[pos.x + '-' + pos.y] = 'hei';
                audiob.play();
                delete kongbai[jion(pos.x, pos.y)];
                if (panduan(pos, 'hei') >= 5) {
                    alert('黑棋获胜');
                    $('.changjing .qizi').off('click');
                }
                var pos = ai();
                // var x=Math.floor(Math.random()*15);
                // var y=Math.floor(Math.random()*15);
                $('#' + pos.x + '-' + pos.y).addClass('bai');
                biao[pos.x + '-' + pos.y] = 'bai';
                delete kongbai[jion(pos.x, pos.y)];
                if (panduan(pos, 'bai') >= 5) {
                    alert('白棋获胜');
                    $('.changjing .qizi').off('click');
                }
               
            }
        })

    }
    
    // var kaiguan=true;
    
	// $(".changjing .qizi").on("click",function(){
        
	// 	if($(this).hasClass("hei")||$(this).hasClass("bai")){
	// 		return;
	// 	}
	// 	$(this).addClass(function(){
	// 		 return (kaiguan)?"hei":"bai";
	// 	})    
	// 	kaiguan=!kaiguan;
	//  })
  // banner循环：
     $(".banner img").fadeOut(0).eq(0).fadeIn(0);
     var num=0;
     setInterval(move,5000);
     function move(){
     	num++;
     	if(num>=$(".banner img").length){
     		num=0;
     	}
     	$(".banner img").fadeOut(500).eq(num).fadeIn(500);
     }
  })
