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


