//-----------Array.forEach();--------------------------

// 1) forEach(この中のthisはなんでしょう？)
// windowになっています；

function Bread(){};
function Jam(){};

/*Bread のprototypeでpriceメソッドを追加*/

/*Bread.prototype = {
  price: function(){
   var args = Array.prototype.slice.call(arguments, 0);
   
   args.forEach(function(arg){
    var value = arg;
    this['argValue'].push(value);　
    //thisはwindowになってしまいましたので、エラーになる
   }
   )
  }
}

var bread = new Bread();
bread.argValue=[];
bread.price(1,2,3);*/

Jam.prototype = {
  price: function(){
   var args = Array.prototype.slice.call(arguments, 0);
   var self = this;
   //上記一文でthis（ここでは）をselfに入れました；
   console.log(args);
   console.log(self); // selfはjam{}になっています
   args.forEach(function(arg){
    var value = arg;
    self['argValue'].push(value);　
   }
   )
  }
}

var jam = new Jam();
jam['argValue'] = [];
jam.price(1,2,3);
console.log(jam);

//2) forEach(callbackfunction)
//callbackfunctionに渡した時には値になっている
var arr1 = ['a','b','c'];
var results = [];
arr1.forEach(
  function(value){
    results.push(value);
  }
)
console.log(results);
arr1 = ['d','e','f'];
console.log(results);

//エリス考え方：

//---------prototype----------------
/*1. prototypeはfunction objectにつけるプロパティで、実質はオブジェクト
{constructor:...., x:...,} になっている*/

//1) function object:

function apple(name){  
 this.name = name;
}

apple.prototype;
// appleはfunction objectだから、prototypeがついている


//2.1) インスタンス＝ここはオブジェクト
var app1 = new apple('app1');
app1.prototype;
//> undefined;
//app1はオブジェクトだから、function objectではない、prototypeがない


//3) Function and Object
Function;
// function Function(){[native code]};
Object;
// function Object(){[native code]};
// they are actually functions named Function and Object

Function.prototype; //存在する
Object.prototype; //存在する

//ただし、デフォルトにそのプロトタイプの中身は違った

//---------__proto__----------------
/*2. __proto__はこのオブジェクトが何から作ったのかを解明するプロトタイプチェーンのことです*/
//1) app1
app1.__proto__;
//> appleより作成しましたので、apple.prototypeを参照する

//2) function object
apple.__proto__ == Function.prototype;
//> appleはfunction objectだから、Function functionより作成しましたので、Function.prototype参照

//3) object object
var app2 = {x:1};
//実は　var  app2 = new Object()....になっている
app2.__proto__ == Object.prototype;


Function.__proto__;
//> function(){}  Function(自身)より生成されたので、自身のprototypeに参照
Function.__proto__ === Function.prototype;

Object.__proto__ === Function.prototype;
// ObjectもFunctionより生成されたので、Function.prototypeに参照


Function.prototype;
// > function() {};
Function.prototype.__proto__;

// > function(){}はオブジェクト?だから__proto__はObject.prototypeに参照する
var a = Function.prototype;
a instanceof Object;
//> true;


