// 05_ArrayObject.js

// 1. 생성자  함수로 배열의 요소 추가 
function Student(name, korean, math, english, science){
    this.name = name;
    this.kor = korean;
    this.math = math;
    this.english = english;
    this.science = science;
    this.getSum = function() {
        return this.kor + this.math + this.english + this.science;
    }
    this.getAvg = function() {
        return this.getSum() / 4;
    }
    this.toString = function() {
        return `${this.name} | ${this.getSum()} | ${this.getAvg()}`;
    }
}      


let students = []; // 빈 배열 생성
let std1 = new Student('홍길남',87,97,64,34); //  Student 객체 생성
students.push( std1 );  // students 배열에 객체 추가

students.push(new Student('홍길남',15,63,61,24));
students.push(new Student('홍길북',45,37,48,82));
students.push(new Student('김길동',65,72,54,29));
students.push(new Student('박길동',78,95,45,8));
students.push(new Student('일지매',54,75,12,34));
for(var i in students){
    console.log( students[i].toString());
}
console.log();
// 또는 

students.map(function(k,i){
    console.log(k.toString());
});
console.log();

//------------------------------------------------------------------------------------
// 객체와 문자열과 그리고 변수, 함수의 활용
let sayNode = function(){
    console.log('Node');
}   // 변수에 함수를 저장해서 변수 이름이 함수 이름이 되게 함.

let myName = 'NodeJs';

// 객체 생성
let obj = { 
   // myName:'NodeJs',  -> 이미 저장이 되었있기 떄문에 중복이 발생함
   // myName:myName,  // 첫 번째 myName: 멤버변수, 두 번째 my name: 일반변수 
                      // this를 로 선언을 안하고 그냥 일반 변수의 myName을 불러옴
  myName,
  // 멤버변수와 대입될 값을 저장하고 있는 일반변수의 이름과 같다면, 위와 같이 한 번만 써서 표현할 수 있음.

  sayJS:function(){
    console.log('JS')
  },
  /*sayNode:function(){
    console.log('Node');
  },*/
  // sayNode:sayNode,
  sayNode,
}
console.log(obj.myName);   
obj.sayNode();
obj.sayJS();


//------------------------------------------------------------------------------------
console.log();   
// obj 객체에 ES6이라는 멤버수를 만들고  'Fantastic' 이라는 글자를 저장하려고 함.
// obj.ES6 , obj['ES6'] 
// #방법 1. obj.ES6 = 'Fantastic';
// #방법 2. obj['ES6'] = 'Fantastic';

// #방법 3.
let es = 'ES';
obj[es+'6'] = 'Fantastic';













