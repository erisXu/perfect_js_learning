//6　関数のクロージャ
//6.-2 関数の呼び出し
// 1) メソッド呼び出し　2) コンストラクタ呼び出し(new式)　3)　関数呼び出し

//6-2-1 宣言文
//宣言した行より前から呼べます
function doit(){
  fn();
  function fn(){
   console.log('called');
  }
}

doit();
//>called;

//ただし下記はエラー
function doit2(){
  fn2();
  var fn2 = function(){
   console.log('called');
  }
}

/*doit2();*/
//> fn2 is not a function
//fn2は変数扱い、だから宣言の前には呼べられない；

//6-3 引数とローカル変数
//6-3-1 argumentsオブジェクト
//argumentsは配列に似てるけど配列ではない、配列になるため、むりやりcallを使う：

function showArgus(){
  var argus = Array.prototype.slice.call(arguments);
  console.log(argus);
}
showArgus(1,"gdhdhd",3);
// >[1, "gdhdhd", 3]

//6-3-2 再帰関数
//例：
function factorial(n){
 if (n <= 1){
  return 1;
 }else{
  return n*factorial(n-1);
 }
}

console.log(factorial(5));
//>120 (5*4*3*2*1)

//6-4 スコープ
var x = 1

//case 1 
//関数ない変数xを定義した場合、ローカル変数xのスコープは関数f内の全域
function f(){
 console.log(x); //>undefined
 var x= 2;
 console.log(x); //>2
}
f();

//下記case1に等価
function f_(){
 var x;
 console.log(x);
 x=2;
 console.log(x);
}


//case2
function f2(){
 console.log(x);
}

f2(); //> 1 


//6-4-2　ブロックスコープ
//存在しない
var x = 1;
{var x = 2; console.log(x);} //>2 

console.log(x); //>2

//for文でもi変数は閉じれれてない
for (var i = 0; i <5; i++){
  console.log(i);
}
// 最後にiは4になる


//6-4-3 letとブロックスコープ
//IE 11から対応
function f3(){
 let x =1;
 console.log(x); //> 1
 {
  let x =2;
  console.log(x); //> 2
 }
 console.log(x); //> 3
}

f3();

// for 文での使い方
var arr = [1,2,3]
for (let I = 0, len=arr.length; I<len; I++ ){
  console.log(arr[I]);
}
var result = this.I&&I;
console.log("I is " + result);
//> I is undefined;
// Iは
console.log("i is " + i);
//> i is 5;

//6-4-4　入れ子の関数とスコープ
//関数の中で別関数を宣言する
function food(){
 var way = "eat";
 
 function fruits(){
   var color = "colorful"
   console.log(way);
   console.log(color);
 }
 
 function meat(){
     console.log(way);
   /*console.log(color);*/
   //>同じ階層関数のローカル変数にアクセスできない
 }
 
 fruits();
 meat();
}

food();

// 6-5 関数はオブジェクト
function MyClass(){
  this.x =1;
  this.y =2;
}
//下記共通点は実体の生成とそれ参照する名前との結びづける
var obj1 = {};
var obj2 = new MyClass();
var obj3 = function(){};
function obj4(){};

// 例：
function f4(){};
f4.foo = 'FOO';
f4.doit = function(){console.log('doit called');}

/*f4:
 コード：{}
 プロパティ：'FOO'
 プロパティ（メソッド）doit: 関数オブジェクト.....
*/

f4 instanceof Function;
f4 instanceof Object;
//> true

//関数名　vs 関数の表示名
function fn_name(){} //関数の表示名
var f5 = function fn_name(){}　//関数名f5

function fn(){} //関数の表示名fn
var fn2 = fn; // 関数名fn2でも呼べる
fn = null;
fn2;

//>function fn(){};

//エリスの考え：
/* fnは　function fn(){}の名にもなってますが、　
　 変数fnにfunction fn(){}を代入するとも言えます
   実質：var fn = function fn(){};
  
   fn2 = fn; ここではfunction fn(){}をfn2に渡す、
   fn2より参照できるようになった
   
   fn = null;　変数fnの参照先をnullに変更した
   function fn(){}　= fn2の参照先に何の影響もない
   
   fn2; はそのまま　function fn(){}になっている
  */
  
 //洋太さんからのサンプルコードあり：
 //https://jsfiddle.net/eris924/s4rndger/


// 6-6 Function クラス
//コンストラクタ

/*Function(p0,p1,...,body)
new Function(p0,p1,...,body)*/


// 6-7 入れ子の関数宣言とクロージャ
// 6-7-1 クロージャの表層的な理解
function f(){
 var cnt = 0;
 return function(){return ++cnt;}
}

var fn = f();
fn(); //>1
fn(); //>2
fn(); //>3

// 6-7-2 クロージャの仕組み
// 1) 入れ子の関数宣言
function f2(){
  function g2(){
   console.log('g2 is called');
  }
  g2(); //ここで暗黙にCallオブジェクトが生成され、Call-gオブジェクトと便意上名乗る
}

f2();　//ここで暗黙にCallオブジェクトが生成され、Call-f2オブジェクトと便意上名乗る
//> g is called;

//ただし、上記Callオブジェクトはそれらの関数を抜けると自動で消滅する

// 2) 入れ子の関数とスコープ
function f3(){
 var n = 123;
 function g3(){
  console.log('n is' + n);
  console.log('g3 is called');
 }
 g3();
}

//> n is 123
//> g3 is called

// 3) 入れ子の関数を返す
// call-f オブジェクトは生成されたけど、call-gは生成されてない、callされてないから
function f4(){
 var n = 123;
 function g4(){
  console.log('n is' + n);
  console.log('g4 is called');
 }
 return g4;
}

f4();
/*>
 function g4(){
  console.log('n is' + n);
  console.log('g4 is called');
 }
*/

//3) クロージャ
var G = f4();
G();
//Gを使って、call-f4オブジェクトのプロパティg4が参照している関数オブジェクトをGが参照してます。
//Gが消えない限り、g4が参照してる関数オブジェクトも生きている
//g4が参照している関数オブジェクトはcall-f4オブジェクトへの参照あるため、これが消えない限り、call-f4も生きている

//何回でもcallし、別参照先に渡す場合：
function Add_arg(arg){
  var n = 123 + Number(arg);
  function g(){
   console.log('n is '+n);
   console.log('g is called');
  }
  return g;
}

//それぞれ別callオブジェクトを渡す
var G2 = Add_arg(2); //call-Add_argオブジェクト1に参照
var G3 = Add_arg(3); //call-Add_argオブジェクト2に参照

G2();//>125
G3(); //>126

//イディオム
function Add_arg(arg){
  var n = 123 + Number(arg);
  return function(){
   console.log('n is '+n);
   console.log('g is called');
  };
}

//6-7-3 クロージャの落とし穴
// (入れ子外側の関数呼び出したときに暗黙に生成されたcallオブジェクトを保持しますが、callオブジェクトのプロパティから参照される先のオブジェクトの状態には保証しません)

//エリスの考え：
/*return 文を使いましたので、そのままcallする時の状態（constructor, 参照できる親の中の変数など）を変数G2に渡されました、元のAdd_argの実体化？ぽい感じ？*/

function Add2(arg){
 var n = 123 + Number(arg);
 function g(){
  console.log('n is ' + n);
  console.log('g is called');
 }
 n++;
 function gg(){
  console.log('n is ' + n);
  console.log('gg is called');
 }
 return [g,gg];
}

var g_and_gg = Add2(1);
// call-Add2オブジェクトの状態で、return[g,gg]の瞬間＝g_and_ggに渡された瞬間にnは125になっている
//g_and_gg.prototype.construcor.<function scope>.Closure.n は125

g_and_gg[0]();
//> n is 125 
//> g is called
g_and_gg[1]();
//> n is 125 
//> gg is called

//6-7-4 名前空間の汚れを防ぐ(クロージャの使い方)

//モジュール
// グローバル変数（関数）の回避
//例
function sum(a,b){
 return Number(a)+Number(b);
}

var position = {x:2,y:3};

//減らすために：
//オブジェクトリテラルの中に閉じ込める
var MyModule ={
  sum: function(a,b){
    return Number(a)+Number(b);
  },
  position: {x:2,y:3}
};

//例えば、gtm経由はすべての変数を同じgtmオブジェクト内に閉じ込めている？

//あるいは：
var MyModule = {};
MyModule.sum = function(a,b){return Number(a)+Number(b); };
MyModule.position = {x:2,y:3};

//クロージャを使って情報を隠す
//無名関数をその場で
var sum = (function(){

 var position = {x:2, y:3};
 
 function sum_internal(a,b){
  return Number(a)+Number(b);
 }
 
 return function(a,b){
  console.log('x = ' + position.x);
  return sum_internal(a,b);
 }
 
})();

sum;
/* > function (a,b){
  console.log('x = ' + position.x);
  return sum_internal(a,b);
 } */
 
sum.position;
//> undefined 

sum(3,4);

//関数に限らず、なんでも出してくれる；

//case1 
var MyModule2 ={
　pro: {x:1,y:2},
  sum: function (x,y){
  return x+y;
 }
}

//外部からアクセスし、修正できる
MyModule2.sum = null;
//case2それを防ぐために：

var obj = (function(){
  var pro = {x:1,y:2}; 
  function sum_internal(x,y){　
   return x+y;
  }
  return {
    sum: function(x,y){return sum_internal(x,y);},
    x: pro.x
  }
})();

obj;
//> {x:1,sum:.....}
// <function scope>の中のclosureの中にfunction sum_internalがありまして、そちらは隠されてアクセスできない


//エリス考え、隠されたものを使い方？
//下のものとの違いは<function scope>だけ?
var obj = (function(){
  return {
    sum: function(x,y){return x+y;},
    x: 1
  }
})();

//6-7-5　クロージャとクラス
// インスタンスのプロパティアクセス制御に使える
//どう制御してます？
//case 1 
function MyClass(x,y){
 this.x = x;
 this.y = y;
 this.show = function(){
  console.log(this.x,this.y);
 }
}

var ins = new MyClass(1,2);
ins;
/*> 
{x:1,
 y:2,
 show: function(){
  console.log(this.x,this.y)}
*/

ins.show();
//> 1 2;

//xとyプロパティはそのままinsオブジェクトの可視化プロパティとして、変更可能です
ins.x=5;
ins.show();
//> 5 2;　　
//xが5に変更されたので、ins.show();の結果も変わりました


//case 2 クロージャを使ってインスタンスを生成した場合：
function MyClass2(x,y){
  return {show: function(){console.log(x,y);}
         }
}

var ins2 = new MyClass2(3,4);
ins2;
//> {show: function(){console.log(x,y)}};
ins2.show();
//> 3 4
ins2.x = 5; //ins2にxプロパティ追加してもshowの結果に影響ない
ins2.show();
//> 3 4 
//ins2インスタンス生成された時の値のまま、showの結果は変わらない：不変オブジェクト？

//カウントを表現するクラス
function counter_class(init){
  var cnt = init || 0;
  return {
    show: function(){console.log(cnt);},
    up: function(){cnt++; return this;},
    down: function(){cnt--; return this;} 
  };
}

var counter1 = counter_class();
counter1.show();
//> 0
counter1.up();
//> {show:..., up:...,down:...} ＋　クロージャの中のcntは１になった
counter1.show();
//> 1 


//考え：クロージャではない場合
function counterclass(x){
  this.cnt = x || 0;
  this.show= function(){console.log(this.cnt);};
  this.up = function(){this.cnt++;};
  this.down = function(){this.cnt--;};
}

var count = new counterclass();
count.show();
//> 0 
count.up();

count.show();
//> 1

//ただし、上記場合に外部からcount.cntよりcntの値をいじることはできるから
count.cnt = 100;
count.show();
//> 100 

// だから危ないですが、クロージャのほうのcntはfunction scopeのClosureのところに隠されて、外部からアクセスできないから、割と安全です

//6-8　コールバックパターン
//6-8-2　jsとコールバック
//複数callback関数を[]で管理
var emitter = {
  callbacks:[],// 複数callback関数の管理
  register: function(fn){
              this.callbacks.push(fn);
            },
 /*onOpen: function(){
              for each (var f in this.callbacks){
                f();
              }
            }*/
};
// for eachは【chrome】からまだサポートされてないから、下記変更：

var emitter = {
  callbacks:[],
  register: function(fn){
               this.callbacks.push(fn);},
  onOpen: function(){
               for (var i= 0; i< this.callbacks.length;i++ ){
                 this.callbacks[i]();}
               }
};


emitter.register(function(){ console.log('event handler1 is called');});
emitter.register(function(){ console.log('event handler2 is called');});

emitter.onOpen();

//コールバックとメソッド
function MyClass(msg){
  this.msg = msg;
  this.show = function(){console.log(this.msg + 'is called');}
}

var obj1 = new MyClass('listener1');
var obj2 = new MyClass('listener2'); 

obj1;
/*{msg: 'linstener1',
   show: function(){...}}
*/
obj2;
/*{msg: 'linstener2',
   show: function(){...}}
*/

emitter.register(obj1.show);
emitter.register(obj2.show);
/* emitterにobj1.showメソッドを登録しようと思いますが、実際にobj1.show は状態（書き込みクロージャなど）がついていない関数オブジェクトに過ぎない;その中身は：
function(){console.log(this.msg + 'is called');}
ここのthisは状況によって変わります*/

emitter.onOpen();
//> undefined is called;
//> undefined is called;
//emitterの中でmsgプロパティは存在しないからだ

//解決策１bind
emitter.register(obj1.show.bind(obj1));
emitter.register(obj2.show.bind(obj2));

emitter.onOpen();
//> 正しく作動します

//ですけれども、下記変更はできる
obj1.msg = "listennerChange";
emitter.onOpen();
//> listenerchangeis called
//> listener2is called

//解決策２　クロージャ
function MyClosure(msg){
  return {msg : msg,
          show: function(){console.log(msg +'is called');}
         }
}

var closure1 =  MyClosure('listener1');
var closure2 =  MyClosure('listener2');

closure1;
/*{msg:'listener1',
   show: function(){...}  
   　　// closureの中msg:'listener1'に固定状態になっている
   }*/

emitter.register(closure1.show);
emitter.register(closure2.show);

emitter.onOpen();
//正しく作動されます

//エリスの考え：
/*1) そのままインスタンスの場合：
　　　msgプロパティにアクセスし、修正できるけど、（可視プロパティ）、
   　 showメソッドはああくまでもメソッドだから、実は関数オブジェクトに過ぎない、状況によって、thisの値も変わってきます
     
2)　インスタンス＋bindの場合、
　　「オブジェクト依存？」
      showメソッドの対象をobj1に固定するから、もしobj1に変更が発生する場合に、
      obj1.show.bind(obj1) の値も変化する
     
3) 　クロージャの場合
　　　「returnされた瞬間の状態そのまま」
   　 msgプロパティは隠されてますので、　
      ずっとreturnする時のままになっています
      ですので、showの結果もcall-MyClosureが生成されたときの結果のまま
*/

//イベントリスナ風の実装（java style）
//上記1)番の問題から、メソッドは関数オブジェクトでthisは特定できないから、obj1,obj2ごと全部入れれば？の考え方
var emitter_javastyle={
  callbacks:[],
  register: function(obj){
              this.callbacks.push(obj);
            },
  onOpen: function(){
              for (var i =0; i< this.callbacks.length; i++){
                if ('onOpen' in this.callbacks[i] ){
                  this.callbacks[i].onOpen();
                }
              }
            }
}

function MyClass_java(msg){
  this.msg = msg;
  this.onOpen = function(){console.log(this.msg + 'is called');}
}

var obj1_java = new MyClass_java('listener1');
var obj2_java = new MyClass_java('listener2'); 

emitter_javastyle.register(obj1_java);
emitter_javastyle.register(obj2_java);

emitter_javastyle.onOpen();
//ですけれど、同じくもしobj1_javaに変更があった場合、callback functionに影響を及ぼす

obj1_java.msg = "listener change"
emitter_javastyle.onOpen();
// 結果は変更する；
