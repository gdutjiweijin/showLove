/**
 * 
 * @authors jiweijin (gdut_jiweijin@sina.com)
 * @date    2016-04-22 23:58:30
 * @version $Id$
 */
function  pageA(element,callback){
   //根元素
   this.$root=element;
   //小男孩
   this.$boy=element.find(".chs-boy");
   //窗户
   this.$window=element.find('.window');
   this.$leftWin  = this.$window.find(".window-left")
   this.$rightWin = this.$window.find(".window-right")
   //运动画面
   this.run(callback);
}

/*开窗*/
pageA.prototype.openWindow=function(callback){
    var  count=1;
    var complete=function(){
        ++count;
        if(count===2){
            callback&&callback();
        }
    }
    var bind = function(data) {
        data.one("transitionend webkitTransitionEnd", function(event) {
            data.removeClass("window-transition")
            complete()
        })
    }
    bind(this.$leftWin.addClass('window-transition').addClass("hover"))
    bind(this.$rightWin.addClass('window-transition').addClass("hover"))
}

/*运动下一个动画*/ 
pageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}


/*停止走路*/ 
pageA.prototype.stopWalk = function(){
    this.$boy.removeClass("chs-boy-deer")
}

/*运动路径*/
pageA.prototype.run=function(callback){
    var that=this;
    var next=function(){
        return  this.next.apply(this,arguments)
    }.bind(this);
    next({
        "time":10000,
        "style":{
              "top":"3rem",
              "right":"10rem",
              "scale":"1.0"
        }
    })
    .then(function() {
       return next({
            "time":800,
            "style": {
               "rotateY" : "-180",
               "scale": "1.2"
            }
        })
    })  
 .then(function() {
        return next({
            "time": 7000,
            "style": {
                "top"   :"6rem",
                "right" : "1.2rem"
            }
        })
    })
    .then(function(){
        that.stopWalk();
        that.openWindow(callback);
    })  
}