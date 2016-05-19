/**
 * 
 * @authors jiweijin (gdut_jiweijin@sina.om)
 * school guangdong university of  technology
 */

/*使高度宽度自适应*/
      var config = {};
        var  docEl=document.documentElement,
               resizeEvt='orientationchange' in window? 'orientationchange':'resize',
               recalc=function(){
                     var  container=document.querySelector('.container');
                     var  proportion=900/1440;
                     container.style.height=container.clientWidth*proportion+'px';
                    docEl.style.fontSize=20 * (docEl.clientWidth / 320) + 'px';
                    var clientWidth = docEl.clientWidth;
                    config.clientWidth = clientWidth;
                   config.clientHeight =  clientWidth * (900 / 1440)
               };
       window.addEventListener(resizeEvt,recalc,false);
       window.addEventListener('DOMContentLoaded',recalc,false);

/*背景音乐*/
function HTML5Audio(url,loop){
    var  audio=new Audio(url);
    audio.autoplay=true;
    audio.loop=loop ||false;
    audio.play();
    return{
        end:function(callback){
            audio.addEventListener('ended',function(){
                callback()
            },false)
        }
    }
}

/*使用观测着模式，场景切换*/ 
function  changePage(element,effect,callback){
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function() {
            callback && callback();
        })
}

var  Christmas=function(){
    var $pageA=$(".page-a");
    var $pageB=$(".page-b");
    var $pageC=$(".page-c");
    var observer=new Observer();
   
  //  A场景页面
    new  pageA($pageA,function(){
        observer.publish("completeA");
    });
    //B场景页面
    observer.subscribe('pageB',function(){
        new  pageB($pageB,function(){
            observer.publish("completeB");
        })
    })
    //C场景页面
    observer.subscribe('pageC',function(){
        new  pageC();
    })

    //页面a-b切换
    observer.subscribe("completeA",function(){
        changePage($pageA,'effect-out',function(){
            observer.publish("pageB");
        })
    })
    //页面b-c切换
    observer.subscribe("completeB",function(){
        changePage($pageC,'effect-in',function(){
            observer.publish("pageC");
        })
    })
}

$(function(){
    //背景切换
    Christmas();
    //背景音乐
   HTML5Audio('http://www.imooc.com/upload/media/one.mp3');
})




