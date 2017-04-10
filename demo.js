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
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


// usage:
$(window).smartresize(function(){
  // code that takes it easy...
});
