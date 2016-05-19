/**
 * 
 * @authors jiweijin (gdut_jiweijin@sina.com)
 * @date    2016-04-22 23:58:30
 * @version $Id$
 */
function  pageB(element,callback){
    //圣诞男孩
    var  $boy=element.find(".christmas-boy");
    var  $girl=element.find(".girl");
    var  $cat=element.find(".cat");
    var  $carousel=element.find("#carousel");
    var $spinner = $carousel.find("#spinner");

   var animationEnd = "animationend webkitAnimationEnd";
   //旋转木马对象
    var carousel = new Carousel($carousel, {
        imgUrls: [
            "../source/images/carousel/1.png",
            "../source/images/carousel/2.png",
            "../source/images/carousel/3.png"
        ],
        videoUrls: [
           "../source/images/carousel/1.mp4",
            "../source/images/carousel/2.mp4",
            "../source/images/carousel/3.mp4"
        ]
    });

    /*视频播放*/
    function  play(){
         var dfd = $.Deferred();
        carousel.run(arguments[0],function(){
            carousel.palyVideo(function(){setTimeout(function(){dfd.resolve()},3000)});            
        })
        return dfd;
    }

    /*小男孩动作*/
    var  boyAction={
        //走路
        walk:function(){
             var dfd = $.Deferred();
            $boy.transition({
                "right": "3.5rem"
            }, 4000, "linear", function() {
                dfd.resolve();
            });
            return dfd;
        },
        //停止走路
        stopWalk:function(){
                var dfd = $.Deferred();
                $boy.removeClass("boy-walk");
                dfd.resolve();
                return dfd;
        },
        //继续走路
        runWalk:function(){
            $boy.addClass("walk-run");
        },
        //解开包裹
        unwrapp:function(){
            var dfd = $.Deferred();
            $boy.addClass("boy-unwrapp");
            setTimeout(function(){dfd.resolve()},3000);
            return dfd;
        },
        //脱衣服
        strip:function(count){
            var dfd = $.Deferred();
           $boy.addClass("boy-strip-"+count).removeClass("boy-unwrapp");
           dfd.resolve();
            return dfd;
        },
        hug:function(){
                $boy.addClass('boy-hug');
                $(".christmas-boy-head").show();
             },
    show3d:function(){
         var dfd = $.Deferred();
         $spinner.show();
         dfd.resolve();
            return dfd;
    },
    down3d:function(){
         var dfd = $.Deferred();
         $spinner.hide();
         dfd.resolve();
            return dfd;
    }
    }

   var  girlAction={
             //小女子起立
             standUp:function(){
                //起立
                var  dfd=$.Deferred();
                $girl.addClass('girl-standUp');
                dfd.resolve();
                return  dfd;
             },
             throwBook:function(){
                var  dfd=$.Deferred();
                $girl.addClass("girl-throwBook").removeClass('girl-standUp');
                $cat.addClass('cat-book').removeClass('cat');
                dfd.resolve();
                return  dfd;
             },
             walk:function(){
                 var  dfd=$.Deferred();
                 $girl.addClass("girl-walk").removeClass('girl-throwBook');
                 $girl.transition({
                    "left":"3.5rem"
                 },1050,'linear',function(){
                      dfd.resolve();
                 });  
                 return  dfd;                      
             },
             stop:function(){
                 var  dfd=$.Deferred();
                 $girl.addClass("girl-stop").removeClass('girl-walk');
                dfd.resolve();
                  return  dfd;
             },
             select:function(){
                var  dfd=$.Deferred();
                 $girl.addClass("girl-choose").removeClass('girl-stop');
                setTimeout(function(){dfd.resolve()},3000);
                  return  dfd;
             },
             weepWalk:function(){
                var  dfd=$.Deferred();
                $girl.addClass('girl-weep').removeClass('girl-choose');
                $girl.transition({
                    "left":"6rem"
                },700,'linear',function(){
                    $girl.addClass('girl-stop').removeClass('girl-weep');
                    dfd.resolve();
                })
                return  dfd;
             },
             hug:function(){
                $girl.addClass('girl-hug');
             }
          };

    //开始调用
    boyAction.walk()
          .then(function(){
           return  boyAction.stopWalk();
          })
          .then(function(){
            return girlAction.standUp();
          })
        .then(function(){
            return  girlAction.throwBook();
         })
        .then(function(){
           return  girlAction.walk();
        })
        .then(function(){
        return girlAction.stop();
        })
        .then(function(){
            return boyAction.unwrapp();
        })
        .then(function(){
                 return boyAction.show3d();
         })
        .then(function(){
            return  girlAction.select();
        })
        .then(function(){
            return play(0);
        })
        .then(function(){
           return  play(1);
        })
        .then(function(){
           return  play(2);
        })
        .then(function(){
           return  $spinner.hide();
        })
        .then(function(){
           return boyAction.strip(1);
       })
        .then(function(){
           return boyAction.strip(2);
       })
        .then(function(){
           return boyAction.strip(3);
       })
        .then(function(){
          return girlAction.weepWalk();
        })
        .then(function(){
            girlAction.hug();
            boyAction.hug();
            callback&&callback();
        });

}
