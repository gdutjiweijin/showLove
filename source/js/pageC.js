/**
 * 
 * @authors jiweijin (gdut_jiweijin@sina.com)
 * @date    2016-04-22 23:58:30
 * @version $Id$
 */

function pageC() {

    this.$window   = $(".page-c .c_window");
    this.$leftWin  = this.$window.find(".c_window-left");
    this.$rightWin = this.$window.find(".c_window-right");
    this.$sceneBg  = this.$window.find(".c_window-scene-bg");
    this.$closeBg  = this.$window.find(".c_window-close-bg");
    this.$car=$(".car");

    // 背景切换
    this.$sceneBg.transition({
        opacity: 0,
    }, 3000);
    this.$closeBg.css("transform", "translateZ(0)")
    this.$closeBg.transition({
        opacity: 1
    }, 5000);
  
    //关门动作
    this.closeWindow();
    this.run();
}


/*运动下一个动画*/ 
pageC.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$car.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}

/*运动路径*/
pageC.prototype.run=function(){
     this.$car.addClass('carRun');
    var that=this;
    var next=function(){
        return  this.next.apply(this,arguments)
    }.bind(this);
    next({
        "time":3100,
        "style":{
              "top":"4.5rem",
              "right":"-3.2rem",
              "scale":"0.6"
        }
    })
    .then(function() {
       return next({
            "time":200,
            "style": {
               "rotateY" : "-180",
            }
        })
    })  
 .then(function() {
        return next({
            "time": 12000,
            "style": {
                "top"   :"-1rem",
                "right" : "13rem",
                "scale":"0.1"
            }
        })
    })
    }
/**
 * 关闭窗
 * @return {[type]} [description]
 */
pageC.prototype.closeWindow = function(callback) {
    //
     var count = 1;
    var complete = function() {
        ++count
        if (count === 2) {
            callback&&callback();
        }
    }
    var bind = function(element) {
        element.addClass("close").one("animationend webkitAnimationEnd", function(event) {
            complete()
        })
    }
    bind(this.$leftWin)
    bind(this.$rightWin)
}
