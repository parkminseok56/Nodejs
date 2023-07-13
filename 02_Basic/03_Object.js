// 03_Object.js

// 1. 자바 스크립트에서의 객체 생성
// { } 중괄호안에 key(요소의 이름)와 value(요소의 값)이 ':' (콜론) 으로 구분되어서 존재하는 값들의 집합.
var product = { name:'냉장고' , 제조사:'대한민국' };
// 변수 하나 안에 한 개 이상의 키값과 벨류값이 조합된 데이터를 넣어 사용함.
// 객체 안에 있는 키값과 벨류값의 조합 하나를 속성이라고 하며, 각 속성은 콤마(,)로 구분함.

// 객체 내의 키값을 이용한 값의 출력
console.log(product['제조사']);
console.log(product.name);

// 자바스크립트의 객체는 별도의 클래스 선언 없이, { } 중괄호 안에 직접 속성들을  넣는 순간,
// 객체(Object)로 인식되어 사용되어짐.
// 값들의 자료형은 제한이 없으며, 객체 안에 객체, 객체 안의 배열 등 모든 형태의 자료가 속성드로 구성이 가능함.
var obj1 = {
     useNumber:273,
     userString:'문자열',
     userBoolean:true,
     useObject:{a:'1', b:'2'},
     useArray:[1,2,3,4,5],  // 오라클과 다르게 마지막 속성에 컴마를 써도 되고 안 써도 됨.
}
var obj2={}; // 객체형 변수를 만들되 아직 넣어 둘 속성이 없다면 빈 객체 생성이 가능함.
             // 자바 스크립트 객체는 변수를 먼저 만들고 추후에 속성을 추가해 넣을 수 있기 때문에 가능함.
console.log(typeof(123));
console.log(typeof(123.123));
console.log(typeof('abc'));
console.log(typeof(true));
console.log(typeof(obj1));
console.log(typeof(obj2));
console.log(typeof({}));


// 2. 객체의 속성과 메서드
// - 속성 : 객체 내부에 있는 하나하나의 값.
// - 메서드 : 객체 내부에 있는 멤버 변수(속성)를 컨트롤하거나 객체 관련 명령을 실행 하기 위한 함수.
var object = {
     useNumber:273,
     useString:'문자열',
     useBoolean:true,
     useArray:[52, 385, 103, 56],
     // 메서드: 객체의 속성 중 함수 자료형인 속성.
     method:function(){
        console.log('멤버 함수를 실행함');
     }
};
object.method(); // 함수의 이름에 괄호를 붙여서 함수의 내용을 실행함.
// var abc = function(){console.log('함수 실행'); };

// abc();    // 함수 이름 옆에 괄호가 있으면 실행.
// console.log( abc ); // 출력 할 시 -> [Function: abc] // 함수 이름만 있으면 문자열을 저장한 변수

console.log(object.method);
// 저장된 자료형(Function)과 함수 이름 (abc) 출력
console.log(object.method());
// 함수의 내부에 잇는 "console.log('멤버 함수를 실행함'); "  실행 -> '멤버 함수를 실행함' 출력됨.
// console.log(object.method()); 에서 console.log() 는 아무것도 리턴되지 않은 함수 
// object.method()의 결과값 undefined 출력

// 멤버함수에 매개변수가 존재 할 수 있음.
var person ={
    name:'홍길동',
    eat:function(food){
        console.log('음식: '+food);
    }
};
console.log(person.name);
person.eat('스파게티');

console.log();
// 멤버 함수가 멤버변수로의 접근
// - this 키워드 : 자바스크립트는 멤버변수에 접근을 위해서 반드시 this 키워드를 써야 함.
var person ={
    name:'홍길동',
    eat:function(food){
        // console.log( this.name + '이/가' + food  + '을/를 먹었읍니다.');
           console.log( `'${this.name} '이/가  '${food}' 을/를 먹었읍니다.`);
    }
};
person.eat('김밥');

console.log();
// 3. 객체의 반복문
var product = {
    name: 'Node.js & Express' ,
    price: 'Free',
    language: '한국어',
    supportOS: 'win32/64',
    subscrpition:true
};

// key : 대상 객체의 속성 이름들을 담을 String 변수
// product : 대상 객체
for( var key in product  ){
     console.log( key , ":", product[key] );
     console.log( `${key}  : ${product[key]}` );
};









