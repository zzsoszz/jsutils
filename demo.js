/*
http://www.cnblogs.com/flyjs/archive/2012/02/20/2360504.html
http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html

JavaScript学习笔记 isPrototypeOf和hasOwnProperty使用区别
http://www.cnblogs.com/ppforever/p/3921481.html
*/


/*
var rword = /[^, ]+/g //切割字符串为一个个小块，以空格或豆号分开它们，结合replace实现字符串的forEach
var class2type = {}
"Null NaN Boolean Undefined Number String Function Array Date RegExp Object Error".replace(rword, function (name) {
    class2type["[object " + name + "]"] = name
})



//测试 start------------------------
function A()
{
	this.aa="";
	this.bb="";
}
var r=/^aaa/i;
var a=new A();
var b={};
console.log(String(null))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(A))
console.log(Object.prototype.toString.call(void 0))
console.log(Object.prototype.toString.call(11))
console.log(Object.prototype.toString.call(22.1))
console.log(Object.prototype.toString.call(["11","222"]))
console.log(Object.prototype.toString.call({}))
console.log(Object.prototype.toString.call(r))
console.log(Object.prototype.toString.call(new Date()))
console.log(Object.prototype.toString.call(document))//[object HTMLDocument]
console.log(class2type);
console.log(class2type[Object.prototype.toString.call(22.1)]);
console.log(class2type[Object.prototype.toString.call(r)]);
console.log(class2type[Object.prototype.toString.call(null)]);
console.log(class2type[Object.prototype.toString.call(A)]);
console.log(class2type[Object.prototype.toString.call(["11","222"])]);
console.log(class2type[Object.prototype.toString.call({})]);
console.log(class2type[Object.prototype.toString.call(r)]);
console.log(class2type[Object.prototype.toString.call(new Date())]);
console.log(class2type[Object.prototype.toString.call(void 0)]);
console.log(class2type[Object.prototype.toString.call(0/0)]);
console.log(window.window==window) 
console.log(document.nodeType==9) 
*/



////////////////////////////////////////////////多层级作用域start
var buildEvalWithinScopeFunction =  function (expression, scopeLevels) {
	var functionBody = "return (" + expression + ")";
	for (var i = 0; i < scopeLevels; i++) {
		functionBody = "with(sc[" + i + "]) { " + functionBody + " } ";
	}
	//with(sc[1]) { with(sc[0]) { return ({text: fullName}) }  } 
	//console.log(functionBody);
	return new Function("sc", functionBody);
};

function MyModelParent()
{
	this.password="";
}
function MyModel()
{
	this.name="";
}
var parent=new MyModelParent();
parent.password="haha";
var model=new MyModel();
model.name="hello";
var aaa="111";
var fn=buildEvalWithinScopeFunction("function (){alert(name+password+aaa)}",2);
fn([model,parent])();
////////////////////////////////////////////////多层级作用域end




////////////////////////////////////////////////正则表达式start
var str = "aaa aab aac\n  aaa aab aac";
var patt1 =/a(a(a|c))+$/igm;//多行匹配影响$符号的意义，单行表示整个字符串尾部，多行表示\n,所以这里加上m可以匹配两个aac,不加只能匹配最后一个
var match;
while(match=patt1.exec(str))
{
	console.log(match.index);
	console.log(match[0]);//第一代表一个完整的匹配项
	console.log(match[1]);//(a(a|c))表示第一个分组，分组是由圆括号产生的，如果需要圆括号不产生分组捕获可以使用?:,分组的顺序是从左往右，由外向内的
	console.log(match[2]);//(a|c)表示第二个分组
}
////////////////////////////////////////////////正则表达式end














//测试 end----------------------------






// console.log(class2type[Object.prototype.toString.call(document)]||document.nodeName||"#");//#document
// console.log(class2type[Object.prototype.toString.call(r)]||r.nodeName||"#");
//如果以#打头说明是dom对象
//console.log(window.window==window)    //window对象特有,window对象不能通过toString后的值来判定，因为各个浏览器的toString值是不用的
//nodeType=9  表示window
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

// HTML DOM的nodeType值介绍
// 1-ELEMENT
// 2-ATTRIBUTE
// 3-TEXT
// 4-CDATA
// 5-ENTITY REFERENCE
// 6-ENTITY
// 7-PI (processing instruction)
// 8-COMMENT
// 9-DOCUMENT
// 10-DOCUMENT TYPE
// 11-DOCUMENT FRAGMENT
// 12-NOTATION 



// console.log({}.toString())
// console.log(Object.prototype.toString.call(window))  //各种浏览器有差别
// console.log(Object.prototype.toString.call(window.window))
// console.log(a);
// console.log(a.constructor.prototype);
// console.log(a.constructor.prototype.hasOwnProperty("isPrototypeOf"));//false
// console.log(b.constructor.prototype.hasOwnProperty("isPrototypeOf"));//true
// console.log(a.constructor && Object.prototype.hasOwnProperty.call(a.constructor.prototype, "isPrototypeOf"));
// console.log(b.constructor && Object.prototype.hasOwnProperty.call(b.constructor.prototype, "isPrototypeOf"));



// console.log(a.constructor);//A()
// console.log(b.constructor);//B()
// console.log(a.constructor.prototype);//A{}
// console.log(b.constructor.prototype);//Object{}

// console.log(b.constructor.prototype.hasOwnProperty);
//console.log(b.constructor.prototype.hasOwnProperty("isPrototypeOf"));//Object{} 如果是纯js对象,就isPrototypeOf这个属性









//console.log(dump_objUp(b));

/* function dump_obj(myObject) {  
  var s = "";  
  for (var property in myObject) {  
     s = s + "\n "+property +": " + myObject[property] ;  
  }
  alert(s);  
}

function dump_objUp(myObject) {  
 
  for (var property in myObject) {  
   var s = "";  
   s = s + "\n "+property +": " + myObject[property] ;
   console.log(s);
  }
  if(myObject.prototype)
  {
	   dump_objUp(myObject.prototype);
  }
} */



Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
}
var time1 = new Date().format("yyyy-MM-dd");
var time2 = new Date().format("yyyy-MM-dd hh:mm:ss");






jQuery.prototype.serializeObject=function(){  
    var obj=new Object();  
    $.each(this.serializeArray(),function(index,param){  
        if(!(param.name in obj)){  
            obj[param.name]=param.value;  
        }  
    });  
    return obj;  
};



JSON.flatten = function(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for(var i=0, l=cur.length; i<l; i++)
                recurse(cur[i], prop + "[" + i + "]");//
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};
if(!Array.prototype.delByIndex)
{
    Array.prototype.delByIndex = function(index) {
        if (index > 0) {
            this.slice(index, 1);
        }
    };
    //Array.prototype.del = function(n)
    //{
    //    if (n<0) return this;
    //    return this.slice(0,n).concat(this.slice(n+1,this.length));
    //};
}
if(!Array.prototype.remove) {
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
}
if(!Array.prototype.moveUp)
{
    Array.prototype.moveUp = function(item)
    {
        var index =this.indexOf(item);
        if(index!=0){
            this.splice(index-1,2, item,this[index - 1]);
        }
    }
}
if(!Array.prototype.moveDown)
{
    Array.prototype.moveDown = function(item)
    {
        var index =this.indexOf(item);
        if(index!=this.length-1){
            this.splice(index, 2, this[index + 1], item);
        }
    };
}



HashMap = function(){
    this._dict = {};
}
HashMap.prototype._shared = {id: 1};
HashMap.prototype.put = function put(key, value){
    if(typeof key == "object"){
        if(!key.hasOwnProperty._id){
            key.hasOwnProperty = function(key){
                return Object.prototype.hasOwnProperty.call(this, key);
            }
            key.hasOwnProperty._id = this._shared.id++;
        }
        this._dict[key.hasOwnProperty._id] = value;
    }else{
        this._dict[key] = value;
    }
    return this; // for chaining
}
HashMap.prototype.get = function get(key){
    if(typeof key == "object"){
        return this._dict[key.hasOwnProperty._id];
    }
    return this._dict[key];
}
HashMap.prototype.remove = function get(key){
    if(typeof key == "object"){
        delete this._dict[key.hasOwnProperty._id];
    }
    delete this._dict[key];
};


//去重复
Array.prototype.unique = function()
{
  var n = {},r=[];
  for(var i = 0; i < this.length; i++) 
  {
    if (!n[this[i]])
    {
      n[this[i]] = true;
      r.push(this[i]);
    }
  }
  return r;
};
console.log(["1","2","1",3,1].unique().join(","));












(function(jQuery) {
  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },
    emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },
    once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },
    on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },
    off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };
}(jQuery));


function SingleSelect(target){
    var self=this;
    self.qsigleselect=target;
    self.data={
        items:[],
        selectedItem:null
    };
    self.selectedItem=null;
    /*
     *子元素更新后触发数据更新
    */
    self.loadDataFromView=function(){
        self.data.items=self.qsigleselect.find(".item").get();
    };
    /*
     *根据数据更新UI
    */
    self.renderDataToView=function(){
        $(self.data.items).each(function(){
            $(this).add($(this).find(".qstatus")).removeClass("active");
        })
        if(self.data.selectedItem)
        {
            $(self.data.selectedItem).add($(self.data.selectedItem).find(".qstatus")).addClass("active");
        };
    };
    /*
     *取值不做不更新UI
     *数据更新之后更新UI
    */
    self.val=function(val){
        if(val){
            var willSelectedItem=$(self.data.items).filter(function(){
                if($(this).data("qvalue")==val){
                    return true;
                }
            });
            self.data.selectedItem=willSelectedItem;
            self.renderDataToView();
            self.emit('change',val);
        }else
        {
            return $(self.data.selectedItem).data("qvalue");
        }
    };
    /*
     *UI事件触发数据更新,数据更新后更新UI
    */
    self.init=function(){
        self.qsigleselect.on("click",".item",function(e){
            if(e.currentTarget!=self.selectedItem){
                self.data.selectedItem=e.currentTarget;
                self.emit('change',self.val());
                self.renderDataToView();
            };
        });
        self.loadDataFromView();
    };
    self.init();
};


jQuery.extend(SingleSelect.prototype, jQuery.eventEmitter);





window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};










(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn) ) : this.trigger(sr); };

})(jQuery,'smartresize');


// usage:
//https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
$(window).smartresize(function(){
  // code that takes it easy...
});







Emitter = (function() {
    function Emitter() {}

    Emitter.prototype.addEventListener = Emitter.prototype.on;

    Emitter.prototype.on = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }
      this._callbacks[event].push(fn);
      return this;
    };

    Emitter.prototype.emit = function() {
      var args, callback, callbacks, event, _i, _len;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this._callbacks = this._callbacks || {};
      callbacks = this._callbacks[event];
      if (callbacks) {
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          callback.apply(this, args);
        }
      }
      return this;
    };

    Emitter.prototype.removeListener = Emitter.prototype.off;

    Emitter.prototype.removeAllListeners = Emitter.prototype.off;

    Emitter.prototype.removeEventListener = Emitter.prototype.off;

    Emitter.prototype.off = function(event, fn) {
      var callback, callbacks, i, _i, _len;
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      }
      callbacks = this._callbacks[event];
      if (!callbacks) {
        return this;
      }
      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      }
      for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
        callback = callbacks[i];
        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };

    return Emitter;

  })();

  




  --------------

/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));





/* 
 *https://devhub.io/zh/repos/house9-jquery-iframe-auto-height
 *https://github.com/house9/jquery-iframe-auto-height
 */
-------------------------iframe自适应
function iframeautoheight(ele)
{
	ele.on("load",function(){
		ele.height(ele.contents().find("html").height());
	});
}

jQuery(document).ready(function() {
	$(".autoheightiframe").each(function(){
		iframeautoheight($(this));	
	});
});








var ImageExplorer=(function ()
{
	var unique;
    function getInstance(){
        if( unique === undefined ){
            unique = new Construct();
        }
        return unique;
    }
	function Construct(){
	    var self=this;
		self.previewbox;
		self.openImage=function(imgPath)
		{
		   var imgpreviewbox=self.previewbox.empty().show();
		   var img=$("<img>").css({
		    "position":"absolute",
		   	"transform":"translate(-50%,-50%)",
		   	"top":"50%",
		   	"left":"50%",
		   	"z-index":"5",
		   	"max-height":"100%",
		   	"max-width":"100%"
		   	});
		   img.attr("src",imgPath);
		   self.previewbox.append(img);
		};
		self.init=function()
		{
			self.previewbox=$('<div id="previewbox" style="position:fixed;z-index:5;top: 0;bottom:0;right:0;left:0;text-align:center;display:none;"></div>');
			self.previewbox.click(function(){
			 	self.previewbox.hide();
			});
			$("body").append(self.previewbox);
		}
		self.init();
	};
	return {getInstance : getInstance}
})();
function isIOS()
{
	var u = navigator.userAgent; 
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
}
function isAndroid()
{
	var u = navigator.userAgent; 
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    return isiOS;
}
function bigimg()
{
	//$("* img:not(a>img)");
	var bigimgAll=$("*:not(a) > img.bigimg").add($("*:not(a) > img[src^='http://bossappnew']"));
	var imgs=bigimgAll.get();
	var imgsUrl=imgs.map(one=>one.src);
	bigimgAll.on("click",function(e){
		var index=imgs.indexOf(e.target);
		if(isIOS())
		{
			window.webkit.messageHandlers.seeBigPic.postMessage({imgArray:imgsUrl,curindex:index});
		}
		else if(window.bossappjs && window.bossappjs.seeBigPic)
		{
			window.bossappjs.seeBigPic(imgsUrl,index);
		}else{
			var imgE=ImageExplorer.getInstance();
			imgE.openImage($(e.target).attr("src"));
		}
	});
}
$(document).ready(function(){
	bigimg();
});





--------------------------------------------------------
http://www.2cto.com/kf/201502/376960.html

//canvas允许将图像文件插入画布，做法是读取图片后，使用drawImage方法在画布内进行重绘。
var img = new Image();
img.src = image.png;
ctx.drawImage(img, 0, 0); // 设置对应的图像对象，以及它在画布上的位置
//由于图像的载入需要时间，drawImage方法只能在图像完全载入后才能调用，因此上面的代码需要改写。
var image = new Image(); 
image.onload = function() { 
    if (image.width != canvas.width)
        canvas.width = image.width;
    if (image.height != canvas.height)
        canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
} 
image.src = image.png;
//drawImage()方法接受三个参数，第一个参数是图像文件的DOM元素（即img标签），第二个和第三个参数是图像左上角在//Canvas元素中的坐标，上例中的（0, 0）就表示将图像左上角放置在Canvas元素的左上角。
 
//getImageData方法可以用来读取Canvas的内容，返回一个对象，包含了每个像素的信息。
var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//imageData对象有一个data属性，它的值是一个一维数组。该数组的值，依次是每个像素的红、绿、蓝、alpha通道值，因//此该数组的长度等于 图像的像素宽度 x 图像的像素高度 x 4，每个值的范围是0–255。这个数组不仅可读，而且可写，//因此通过操作这个数组的值，就可以达到操作图像的目的。修改这个数组以后，使用putImageData方法将数组内容重新绘//制在Canvas上。
context.putImageData(imageData, 0, 0);
 
//对图像数据做出修改以后，可以使用toDataURL方法，将Canvas数据重新转化成一般的图像文件形式。
function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL(image/png);
  return image;
}
 
//save方法用于保存上下文环境，restore方法用于恢复到上一次保存的上下文环境。
ctx.save(); 
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 5;
ctx.shadowColor = rgba(0,0,0,0.5);
ctx.fillStyle = #CC0000;
ctx.fillRect(10,10,150,100);
ctx.restore(); 
ctx.fillStyle = #000000;
ctx.fillRect(180,10,150,100);
//先用save方法，保存了当前设置，然后绘制了一个有阴影的矩形。接着，使用restore方法，恢复了保存前的设置，绘制//了一个没有阴影的矩形
 
//利用JavaScript，可以在canvas元素上很容易地产生动画效果
var posX = 20,
    posY = 100;
setInterval(function() {
    context.fillStyle = black;
    context.fillRect(0,0,canvas.width, canvas.height);
    posX += 1;
    posY += 0.25;
    context.beginPath();
    context.fillStyle = white;
    context.arc(posX, posY, 10, 0, Math.PI*2, true); 
    context.closePath();
    context.fill();
}, 30);
//产生一个小圆点，每隔30毫秒就向右下方移动的效果。setInterval函数的一开始，之所以要将画布重新渲染黑色底色，//是为了抹去上一步的小圆点。
//通过设置圆心坐标，可以产生各种运动轨迹。
//先上升后下降。
var vx = 10,
    vy = -10,
    gravity = 1;
setInterval(function() {
    posX += vx;
    posY += vy;
    vy += gravity;
    // ...
});
//x坐标始终增大，表示持续向右运动。y坐标先变小，然后在重力作用下，不断增大，表示先上升后下降。
//小球不断反弹后，逐步趋于静止
var vx = 10,
    vy = -10,
    gravity = 1;
setInterval(function() {
    posX += vx;
    posY += vy;
    if (posY > canvas.height * 0.75) {
          vy *= -0.6;
          vx *= 0.75;
          posY = canvas.height * 0.75;
    }
    vy += gravity;
    // ...
});
//一旦小球的y坐标处于屏幕下方75%的位置，向x轴移动的速度变为原来的75%，而向y轴反弹上一次反弹高度的40%。
 
//通过getImageData方法和putImageData方法，可以处理每个像素，进而操作图像内容。
//假定filter是一个处理像素的函数，那么整个对Canvas的处理流程，可以用下面的代码表示。
if (canvas.width > 0 && canvas.height > 0) {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    filter(imageData);
    context.putImageData(imageData, 0, 0);
}
 
//以下是几种常见的处理方法。
//灰度图（grayscale）就是取红、绿、蓝三个像素值的算术平均值，这实际上将图像转成了黑白形式。假定d[i]是像素数组中一个象素的红色值，则d[i+1]为绿色值，d[i+2]为蓝色值，d[i+3]就//是alpha通道值。转成灰度的算法，就是将红、绿、蓝三个值相加后除以3，再将结果写回数组。
grayscale = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }
    return pixels;
};
 
//复古效果（sepia）则是将红、绿、蓝三个像素，分别取这三个值的某种加权平均值，使得图像有一种古旧的效果。
sepia = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i]     = (r * 0.393)+(g * 0.769)+(b * 0.189); // red
      d[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); // green
      d[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); // blue
    }
    return pixels;
};
 
//红色蒙版指的是，让图像呈现一种偏红的效果。算法是将红色通道设为红、绿、蓝三个值的平均值，而将绿色通道和蓝色通道都设为0。
red = function (pixels) { 
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i];
      var g = d[i + 1];
      var b = d[i + 2];
      d[i] = (r+g+b)/3;        // 红色通道取平均值
      d[i + 1] = d[i + 2] = 0; // 绿色通道和蓝色通道都设为0
    }
    return pixels;
};
 
//亮度效果（brightness）是指让图像变得更亮或更暗。算法将红色通道、绿色通道、蓝色通道，同时加上一个正值或负值。
brightness = function (pixels, delta) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
          d[i] += delta;     // red
          d[i + 1] += delta; // green
          d[i + 2] += delta; // blue   
    }
    return pixels;
};
 
//反转效果（invert）是指图片呈现一种色彩颠倒的效果。算法为红、绿、蓝通道都取各自的相反值（255-原值）。
invert = function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i];
        d[i+1] = 255 - d[i + 1];
        d[i+2] = 255 - d[i + 2];
    }
    return pixels;
};

