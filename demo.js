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
