/*
http://www.cnblogs.com/flyjs/archive/2012/02/20/2360504.html
http://www.cnblogs.com/ziyunfei/archive/2012/11/05/2754156.html

JavaScript学习笔记 isPrototypeOf和hasOwnProperty使用区别
http://www.cnblogs.com/ppforever/p/3921481.html
*/



function A()
{
	this.aa="";
	this.bb="";
}

var r=/^aaa/i;
var a=new A();
var b={};


// console.log(Object.prototype.toString.call(null))
// console.log(Object.prototype.toString.call(A))
// console.log(Object.prototype.toString.call(11))
// console.log(Object.prototype.toString.call(22.1))
// console.log(Object.prototype.toString.call(["11","222"]))
// console.log(Object.prototype.toString.call({}))
// console.log(Object.prototype.toString.call(r))
console.log(Object.prototype.toString.call(document))

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
// console.log(b.constructor.prototype.hasOwnProperty("isPrototypeOf"));//Object{}    
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