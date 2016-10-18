//5.7 オブジェクトの生成
//5.7.1 リテラル
//-----------singleton pattern--------------
var single = {'name':'eris'};
//single.name will always be 'eris'

/*----------multi-value data------------*/
//----input---------
// ----ex1  input several arguments
function getDistance1(x,y,z){
return x+y+z;
}
// ----ex2 input object---------------
function getDistance2(pos){
return pos.x+pos.y+pos.z;
}
var pos = {x:1,y:2,z:3};
getDistance2(pos);
// returns 6;

// ----ex3 input object in a saver way---------------
function getDistance2(pos){
pos = pos||{x:0,y:0,z:0};
return pos.x+pos.y+pos.z;
}

/*----output-----------------------------*/
// ex1
function fn(){
 return {x:1,y:2,z:3};
}

//ex2 独自拡張[]配列で返してくれた値をそのまま変数に渡す
function arrayValue(){
 return [2,4,6];
}
var x,y,z;
[x,y,z] = arrayValue();

/*---------function used as constructor------------*/
function createObj(){
  return {x:1,y:2,z:3,getValue:function(){return this.x;}};
}
var obj1 = createObj();

//5.7.2 コンストラクタとnew式
//ex 5.8 コンストラクタ（クラスの定義）
function myClass(x,y){
  this.x = x;
  this.y = y;
}
var obj2 = new myClass(3,2);
// new式の動き
function myClass2(){
 this.x = 1;
}
var obj3 = new myClass2();
// new でまず空のオブジェクトを作成
//　そしてclassに沿った形にし
//　それを参照先として変数に渡す？

//コンストラクタ内のreturnは？
// return ex 1 普通のコンストラクタ
function MyClass3(){
  this.x = 1;
  this.y = 2;
  // return.thisが実は常に存在する；
}
var obj4 = new MyClass3();

// return ex2 もしreturn がある場合
function MyClass4(){
  this.x = 1;
  this.y = 2;
  return {x:2,y:4};　
  return this;
  // return.thisが実は常に存在する
}

var obj5 = new MyClass4(); // obj5 = {x:2,y:4}

//5.7.3 コンストラクタとクラス定義
function MyClass5(x,y){
//下記フィールド相当
  this.x = x;
  this.y = y;
// 下記メソッド相当
  this.show = function(){
    return(this.x+this.y);
  }
}
var obj6 = new MyClass5(2,3);

//
/*5.8~5.10*/
/*-------------perfect javascript chapter 5-8 プロパティ-------------*/

//リテラル
var key = 'x';
var obj1 = {x:1, y:2};
var obj2 = {key:1,y:2}; // プロパティxではなく、keyです

obj1.x == obj1['x']; //>true
obj1.x == obj1[key]; // >true
obj2.key == 1; //>true
obj2[key] == obj2['x'] == undefined; //true
 
({x:1,y:2}).x; // そのままアクセスできる
({x:1,y:2})['x'];

// プロパティ値はundefined vs 存在しないプロパティ
var obj3={a:undefined};
obj3.a; //>undefined
obj3.b; //>undefined



/*------------5-8-2 ドットvs[]--------------*/
var obj4 = {'foo-bar':5, x:6, a:7,b:8};

// property name cannot be read by (.)
obj4.foo-bar; //>エラー
obj4['foo-bar']; // >5

// property name is a variable
var key1 = 'x';
obj4.key1; // >undefined
obj4[key1]; // >6

// when property name is 式

Math[this<0? 'ceil':'floor'](-9.8); // >-10

/*Math is a class (object) including methods named 'ceil' and 'floor'*/

'ceil' in Math// >true


/*---------- 5-8-3 プロパティの列挙---------*/
var obj5 = {x:1,y:2,z:3};
for (var key in obj5){　　　　　　　// variable in object の書き方_ie10
  console.log('key='+key);
	console.log('val=' + obj5[key]);
}

//配列の場合
var arrey2=[1,2,3,4];
for (var i in arrey2){
console.log(i);
console.log(arrey2[i]);
}

/*--------perfect javascript chapter 5-9 連想配列としてのオブジェクト----------*/


/*--------------- 5.9.1　連想配列---------*/

// method, prototype以外に、javaのマップに似ている使い方
//（キー：値）のペア達：連想配列、マップ、ハッシュ
// キー≒プロパティ名；　値≒プロパティ値
var map = { x:3, y:4};
console.log(map.x); //> 3
delete(map.x); //ｘ:3を削除
//java, c++ などのdeleteとまったく違う



/*----------------5.9.2 注意点---------------*/

//  1)プロトタイプ継承

function MyClass(){}; //クラス作成
MyClass.prototype.z = 5;　//メソッド（プロパティ）追加

var obj6 = new MyClass();
obj6.z; //> 5  : 継承したプロパティ

//継承したプロパティ含めて確認したい場合：
for (var i in obj6){
 console.log(i);
}
//> z

//継承したプロパティは削除できない
delete(obj.z);
obj.z; //>5 


//  2)オブジェクトなど　built-in　クラスのプロトタイプを継承する

var obj7 = {}; //空のオブジェクトだけど、実際はObjectクラスのinstance
'valueOf' in obj7;
//> true


//enumerable属性だから、列挙されない
for (var key in obj7){
 console.log(key);
}
//> undefined


//  3)　継承したプロパティのチェックにはhasOwnProperty
obj7.hasOwnProperty('toString');
//> false 　> 直接のプロパティではないため

obj7['toString']=1; //toStringプロパティの値を1として上書きした

obj7.hasOwnProperty('toString');
//> true

obj7.toString;
//>1
obj7.toString();
//エラー　toString is not a function(...)



/*--------perfect javascript chapter 5-10 プロパティの属性----------*/


//プロパティにも属性がある
var obj8 = {x:1,y:2};
Object.getOwnPropertyDescriptor(obj8, "x");
//>  Object {value: 1, writable: true, enumerable: true, configurable: true}
// value is only one of the attributes
// value, writable, enumerable, configurable, get, set;


Object.getOwnPropertyDescriptor(obj8, "toString");
//> undefined??
// "toString"プロパティのgetはfalseになっている

/*-----------------------5-12不変オブジェクト-----------------------------*/

//5-12-3 javascriptで不変オブジェクトを作るには
//   1) クロージャ　 6-7-5
//   ２）これをサポートする ECMAScript 5関数　preventExtensions, seal, freeze
//     IE11~
var obj = {x:2,y:3};
var obj2 = {x:2,y:3}; 
var obj3 = {x:2,y:3};

//　２．１）preventExtensions
Object.preventExtensions(obj);

obj.k = 4;　
//> Object {x: 2, y: 3}　　追加できない

delete(obj.x); //削除できる
obj.y = 8; //変更はできる

//　２．２）seal 
Object.seal(obj2);

obj2.k = 4;  //追加できない
delete(obj2.x); //削除できない
obj2.x = 8; //変更はできる

//　２．３）freeze

Object.freeze(obj3);

obj3.k = 4;  //追加できない
delete(obj3.x); //削除できない
obj3.x = 8; //変更もできる


// seal: configurableをfalseにした
Object.getOwnPropertyDescriptor(obj2,"x");
//> Object {value: 8, writable: true, enumerable: true, configurable: false}

// freeze: writable をfalseにした
Object.getOwnPropertyDescriptor(obj3,"x"):
//> Object {value: 2, writable: false, enumerable: true, configurable: false}
	
	
	
/*------------------------------------5-13メソッド-----------------------------*/
//javascriptにメソッドはないけど、
//オブジェクトのプロパティに関数を設定し、関数内にthis.propertyにアクセスしたものをメソッドと呼ぶ
	
	
	
/*-------------------------------5-14 this 参照-----------------------------*/
	
//thisを使う場所によって、参照先が変わる

//5-14-1 this参照のルール
	
//1) top level code: グローバルオブジェクト
var globalObj = 3,
globalObj2 = {x:1,y:2},
globalObj3 = [1,2,3,4];

this.globalObj;
//> 3

this.globalObj2;
//> Object {x: 1, y: 2}
// あるグローバル変数存在確認に使える,なければundefinedになる

//2) 関数内：呼び出す方法による
//例：レシーバオブジェクト

var obj4 = {
 x:3,
 doit: function(){
   console.log("this.x="+this.x); //thisはレシーバオブジェクトを参照
  }
};

obj4.doit();



//5-14-2 this参照の注意点


// JavaとC++　レシーバオブジェクト　＝　このクラスのインスタンス
// javascript 限らない : メソッドは同時にオブジェクトのプロパティになっている？



//1) メソッド関数がグローバル変数に渡された場合

var globalVar = obj4.doit; //doitメソッド（プロパティ）値をグローバル変数に代入

globalVal;
/*> function(){
   console.log("this.x="+this.x);
  }*/
globalVal();
//> this.x=undefined; 　
//ここは1)の場合、toplevelcodeだから、this = グローバルオブジェクト；

var x = 5;
globalVal();
//> this.x= 5; // グローバルオブジェクトx



//２) メソッド関数が別オブジェクト内のプロパティに渡された場合
var obj5 ={
	x:3,
	doit2: obj4.doit;   // ここは関数オブジェクトの参照になっている
};

obj5.doit2;
/*> function(){
   console.log("this.x="+this.x);  //ここでthisがobj5を参照するようになった
  }*/

obj5.doit2();
//> this.x = 5;

//3)メソッド内の下請けメソッド
var obj6 = {x:3,
            void: function(){console.log(this.void2());},  // void内でvoid2を読んでもthisが必要
            void2: function(){console.log("void2="+this.x);}
            }


/*-----------------------5-15 apply と　call (関数オブジェクトのレシーブオブジェクト指定)-----------------------------*/	
		
/*関数オブジェクトのthis参照先を指定する*/
		
function f(){
  console.log(this.x);
}

var obj7 = {x:4};

f.apply(obj7);  //> 4
f.call(obj7);  //> 4


/*前例のオブジェクト内関数のthis参照先を別オブジェクトに変更
var obj4 = {
 x:3,
 doit: function(){
   console.log("this.x="+this.x); //thisはレシーバオブジェクトを参照
  }
};
*/

obj4.doit.call(obj7);  // obj4.doitは関数オブジェクトとして
//> this.x = 4;


/*applyとcallの違い*/
function f2(a,b){
 console.log('this.x = '+this.x + ';a=' + a + ';b=' + b);
}

/*apply|callの第一引数はthisの参照先になり、
　　          残りは普通の引数に渡す*/

f2.apply({x:4},[1,2]);   //applyは配列として

//> this.x = 4;a=1;b=2

f2.call({x:4}, 1, 2);　 //callはそれぞれ

//> this.x = 4; a=1; b=2

/*ーーーーーーーーーーー ?クラス、関数オブジェクト？の使い方再考えーーーーーーーーーー*/

function myClass(x,y){
 this.x = x;   
 this.y = y;
}

//例１：クラスとして使用
var obj8 = new myClass(3,4);
//> {x:3, y:4}   myClassに沿ったx,yプロパティのあるオブジェクトを生成する


//例２：関数オブジェクトとして使う

myClass.call(obj8, 5, 6);
// > {x:5, y:6}   obj8をthis参照先にし、obj8のx,yプロパティの値を上書き


//例３：オブジェクト内のプロパティの削除？

function myClass_clear(){
  for (var key in this){
    delete(this[key]);　　//this.key = this['key']! 
  }
}

myClass_clear.call(obj8);
//> {}　空のオブジェクト
	
//例４ オブジェクトaのプロパティをオブジェクトbにコピーする

function myClass_copy(obj){
  for (var key in this){
    obj[key] = this[key];
  }
}

var obj9 = {x:1,y:2};
var obj10 = {};

myClass_copy.call(obj9, obj10);

// obj10 :  {x:1, y:2}
	

// ーーーーーーーーーーーーーーー考え：　new クラス　vs クラス.call();
/*
function myClass(x,y){
 this.x = x;   
 this.y = y;
}
*/

var obj11, obj12 = {};

//new 式は新しいオブジェクトを生成し、それをthisとして参照する
obj11 = new myClass(2,3);  

//callはobj12をthisにとして参照する
myClass.call(obj12, 2, 3);

//--------------------------------------あまり上記使い方されてない
//-----------------callの使い方：---------------------------------

var elements1 = document.querySelectorAll('div');
var elements2 = document.getElementsByTagName('div');

//一見両方とも配列ぽいですが、実は配列ではない;
//array like objectです;
Array.isArray(elements1); //> false
Array.isArray(elements2); //> false


//それを無理やり配列に入れて、slice()などを使いたい場合に、callを使う

var arr1 = Array.prototype.slice.call(elements1);

Array.prototype.join.call(elements1,'-'); // 無理やり配列として、'-'で連結しました;

Array.isArray(arr1); //> true

/*-----------------------5-16 プロトタイプ継承-----------------------------*/	
// リテラル
// クラス名.prototype.メソッド名＝function(メソッド引数)｛メソッド本体｝
//関数以外でも継承できるけど、あまり意味ないから、大体関数になっている


//5-16-1 プロトタイプチェーン

//　　1) すべての関数オブジェクトはprototypeという名のプロパティを持っている
//　　2) すべてのオブジェクトは生成に使ったコンストラクタ（関数オブジェクト）のprototypeへのリンクを持っている

//-------------------プロパティの探す順番-----------------------------------
/* ⓵オブジェクト自身のプロパティ
　 ⓶暗黙リンク constructor.prototype　オブジェクトのプロパティ
　　　　　　　 __proto__ （実装ベース）
*/



//-------------5-16-2 プロトタイプチェーンの具体例-------------------------------

//１　プロパティ読み込み例------------

function myClass(){
 this.x = 'x in myClass';
}

var obj = new myClass();

console.log(obj.x);  //オブジェクト　プロパティx　にアクセス
//> 'x in myClass';

console.log(obj.z);
//> undefined 　　　 //オブジェクトにzプロパティはない

myClass.prototype.z = 'z in myClass';

// myClass : 1 {x:'x in myClass'}
//           2 prototype object {z: 'z in myClass', constructor: コンストラクタ中身...};



console.log(obj.z);
//> 'z in myClass'   

//コンストラクタのprototypeオブジェクトのzプロパティにアクセス

// obj :  1 {x:'x in myClass'}
//        2 __proto__ object {z: 'z in myClass', 
//                            constructor: {prototype: {constructor:....,
//                                                      z: 'z in myClass'}},
//                            ......
//                            }

//注意：　myClassのprototypeオブジェクトプロパティが変更したら、インスタンスオブジェクトにも影響及ぼす


//２　プロパティ書き込み例------------
function myClass2(){
 this.x = 'x in myClass';
}

myClass2.prototype.y = 'y in myClass2 prototype';

var obj2 = new myClass2();

console.log(obj2.y);       
//> 'y in myClass2 prototype' 
// obj2.__proto__.y

//プロトタイプチェーンでプロパティyを読み取る


obj2.y = 'override';  // obj2のプロパティにyを追加

// obj2は　myClass2 {x: "x in myClass", y: "override"}　になった;

console.log(obj2.y);
// obj2.y : "override", 
// obj2.constructor.y : "y in myClass2 prototype" 

// obj2自身のプロパティを優先にアクセスする

var obj3 = new myClass2();
console.log(obj3.y);
// > 'y in myClass2 prototype';
// myClass影響してない、obj2だけに書き込みました


//３　プロパティ削除例------------
delete obj2.y;
// obj2の”ローカル”yプロパティが削除された故、

console.log(obj2.y); // == obj2.constructor.y
//> 'y in myClass2 prototype';

delete obj2.y;
//もう一度削除してみ、結果はtrueだけど

console.log(obj2.y); 
//> 'y in myClass2 prototype';
// myClass2にあるprototypeプロパティはこのままで削除できないけど、
// 5-16-3 プロトタイプの継承とクラスで削除できる方法がある


obj2.hasOwnProperty('constructor');
//>false 



//---------------5-16-3 プロトタイプの継承とクラス------------------


// 上記似たように、built-in のクラスprototypeへも暗黙のリンクでアクセスできる
// 例えばObjectクラス
Object.prototype;
//> built-inのプロトタイプが存在します
Object.prototype.hasOwnProperty('toString');
//> true

var obj3 = new Object({x:1});
obj3.constructor == obj3.__proto__.constructor; 
// obj3はオブジェクトだから、自分にはprototype,constructorがないけど、
//Object まで遡れる；



//----------------5-16-4 __proto__プロパティ---------------
/*プロトタイプオブジェクトと呼ぶ*/
/*__proto__は実装ベースです*/


//----------------5-16-5 __proto__ プロトタイプオブジェクト---------------

function MyClass3(){};
var obj4 = new MyClass3();

obj4.__proto__  === MyClass3.prototype;
//> true
//同じところを参照してます

obj4.constructor === MyClass3;
//>true
//obj4.constructor :obj4を作成したときに参照した構成？

MyClass3.constructor.prototype === MyClass3.__proto__;
//> true;
//> 結果は：　function() {}　

//----------------5-16-6 プロトタイプオブジェクト---------------
//新しいメソッド
Object.getPrototypeOf(obj4);　

//標準準拠,自身あるいは一番近い親のプロトタイプをgetする

obj4.constructor.prototype; 
// インスタンスオブジェクトのコンストラクタ経由で取得、常に使える保証はない
//原因はchapter5-17 constructorの部分で確認してください

obj4.__proto__;  //独自拡張


/*----------------------考え、注意すべきところ-----------------------------*/

/*obj4.__proto__ および　obj4.constructor.prototypeでプロトタイプオブジェクトに参照するため、

もしプロトタイプ・プロパティを上書きしましたら、クラスのプロパティも上書きされてしまう*/

function MyClass4(){
 this.x = 1;
};

MyClass4.prototype.y= 2;

var obj5 = new MyClass4();
obj5.__proto__.y;
//> 2

obj5.__proto__.y = 3; //参照先のyプロパティを上書きしました;

MyClass4.prototype.y;
//> 3

/*-----------------------5-17 オブジェクトと型-----------------------------*/	

//基本の型判定：　typeof() : オブジェクト型はobjectになる

// 5-17-1 型判定：constructor プロパティ

//オブジェクト.constructorである程度何かをプロトタイプから継承したのかがわかる
var obj1 = new Date();
var obj2 = [1,2,3];
var obj3 = {};

obj1.constructor;
//> function Date() { [native code] }

obj2.constructor;
//> function Array() { [native code] }

obj3.constructor;
//> function Object() { [native code] }


function MyClass(name){
 this.x = name;
}

var obj4 = new MyClass('4');

obj4.constructor === MyClass === obj4.__proto__.constructor === MyClass.prototype.constructor;



//-------!基本一緒だけど、prototypeプロパティの中のconstructorは変更可能ですので、注意！-------



// 5-17-2 constructor プロパティ注意点

function fn1(){};

var obj5 = new fn1();

obj5.__proto__;  // == fn1.prototype;
obj5.constructor; // == obj5.__proto__.constructor == fn1.prototype.constructor == fn1;

fn1.prototype = {x:1,y:2}; 
//fn1.prototypeプロパティを上書きしました；
//そもそもコンストラクタプロパティがなくなる；

var obj6 = new fn1();

obj5.constructor;
// function fn1(){};  
//変更なし、生成されたとき、参照したコンストラクタ

obj5.__proto__ !== fn1.prototype;
//>true


obj6.__proto__ == fn1.prototype == {x:1,y:2};

obj6.constructor == obj6._proto__.constructor == fn1.prototype.constructor; 
//fn1のプロトタイプはいまオブジェクトだから、prototypeプロパティがないため、
fn1.prototype.constructor == fn1.prototype.__proto__.constructor == Object.prototype.constructor;
//> function Object() { [native code] };


//その対処：
fn1.prototype.constructor= fn1; //この一文で還元する？


// 5-17-3 オブジェクトの型判定（instanceof isPrototypeOf）

// 1) instanceof

var d = new Date();
d instanceof Date;
//> true; 
//dはDateより作成されたものだから

d instanceof Object;
//> true;

/*基底　vs 派生クラス*/
function Base(){};
function Derived(){};

Derived.prototype = new Base();

var obj = new Derived();

obj instanceof Derived;
//> true;

obj instanceof Base;
//> true;

obj instanceof Object;
// > true;

//2) .isPrototypeOf: objectより遡れるプロトタイプチェーンはtrueになる

Object.prototype.isPrototypeOf(obj);
//true

Base.prototype.isPrototypeOf(obj);
//true

Derived.prototype.isPrototypeOf(obj);
//true

/*---------注意: 

1) instanceof　　

      object instanceof constructor

objectを作成したときには何を参照したのかを確認できます
さらに、その参照先のさらに親コンストラクタも確認できます
*/

function MyClass(name){
 this.x = name;
}

var obj7 = new MyClass;

obj7 instanceof MyClass;
//> true 


//2) isPrototypeOfはもともとObjectのメソッドになる
Object.prototype.hasOwnProperty('isPrototypeOf');


// 5-17-4 型判定、ダックタイピング
//constructor と　instance of だけでは、メソッドなどのプロパティは判定しづらいです
//このときはin演算で、直接オブジェクトの振る舞いを見る
MyClass.prototype.y = "yyy";

'y' in obj7;
//> true;

'hasOwnProperty' in obj7;
//> true;
//さらに、親(オブジェクト)のprototypeもアクセスできる


// 5-17-5 プロパティ列挙（継承いり）

//1) key in : プロトタイプチェーンを辿り着きます；
//hasOwnProperty();

function MyClass2(x){
 this.x = x;
 this.y = this.x+1;
}

MyClass2.prototype.add = 'add';

var obj8 = new MyClass2(1);

//直接のプロパティだけがほしい場合：
for (var key in obj8){
	if (obj8.hasOwnProperty(key)){ 
	    console.log(key);
	}
}
// x,y;
// add はプロトタイプチェーンで遡ったものだからない


//2) Objectクラスのメソッド
//Object.keys();   : enumerableのプロパティが返してくれます;列挙可能
//Object.getOwnPropertyNames();　:including not enumerable ones

var arr = [1,2,3]
Object.keys(arr);
//["0","1"];

Object.getOwnPropertyNames(arr);
//["length","0","1"]

Object.keys(Object.prototype);
//[];
// not enumerable propertiesだから keysでは列挙不可

Object.getOwnPropertyNames(Object.prototype);
// ["__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "constructor", "toString", "toLocaleString", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "__proto__"]

//---------------5-18  最新のObjectクラス------------------------------------------
// createメソッド
//Object.create(プロトタイプ, プロパティ)；

// 5-18-0 第一引数: プロトタイプ
var obj = Object.create(null);  //第一引数：prototypeに何もないから
Object.getPrototypeOf(obj); // ≒　obj.__proto__
// >null;
'toString' in obj;
// >false;

var obj2 = Object.create(Object.prototype);
// equal var obj2 = {};


//5-18-1 第二引数: プロパティオブジェクト
var obj3 = Object.create(Object.prototype,
												 {x:{value:2, writable: true, enumerable: true, configurable: true},
													y:{value:3, writable: true, enumerable: true, configurable: true},
												 });

//この形で、プロパティのプロパティをいじることができる； 例えばobj3.xプロパティをnon-writableに設定するなど

var obj4 ={x:2, y:3}


//オブジェクトにプロパティ追加や変更などができる：
var obj5 = Object.create(Object.prototype,
												 { x:{value:2}
												 }
											  );
		
Object.getOwnPropertyDescriptor(obj5,'x');

//> Object {value: 2, writable: false, enumerable: false, configurable: false}		

//設定されてないものはdefaultでfalseになっている
		
Object.defineProperty(obj5,'y',{value:2,enumerable:true});
//追加することもできる、明記されないものはfalseになる；

obj5;
// {x:2,y:2};

Object.keys(obj5);
//["y"];
//ｘはenumerable:falseになっているからだ



//5-18-2 アクセッサ属性: get set 

//オブジェクトのプロパティにアクセス・編集するときにやることを定義

var obj6 = Object.create(Object.prototype,
					               {x:{get:function(){console.log('get called')},
                            set:function(v){console.log('set called')}
                         }
					               });

obj6.x;
//> 'get called';

obj6.x =1;
//> 'set called';

