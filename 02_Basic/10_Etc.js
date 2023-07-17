// 10_Etc.js

// try~catch (예외 처리)
const sports = '축구';

// const 변수란 : 상수형 변수이므로 변수가 생성될때, 반드시 초기값이 있어야하며, 이 후 값을 변경 할 수 없음.

try{
sports = '영어';
}catch(err){
    console.log('에러 발생 : const(상수형) 변수는 값을 변경할 수 없음');
    console.log(err);
    console.log('위의 사유로 해당 명령은 실행되지 않고, 넘기고 다음 코드로 계속 진행함');
}
console.log(sports);

console.log();
const obj = {language: "한글"};
console.log( obj );
obj.language = "영어";
console.log( obj );
// obj 변수는 language 라는 필드에 멤버변수를 갖는 객체로 선언되어서, 그 형태만 고정되기 때문에  const 변수로 선언해도
// 안의 내용을 바꾸더라고 에러 사유가 되지 않는다.
// obj 변수는 객체의 주소를 저장하는 참조 변수임.
// obj = {};
// 위와 같이 obj 변수가 갖는 참조값을 변경하는 것은 에러이지만, 그 외의 동작은 에러가 발생하지 않음. 
try{
    obj = {};
}catch(e){
    console.log("const 변수의 값은 재할당(변경)이 불가능함.")
}
obj.language = "영어";
console.log(obj.language);

// #에러 발생의 기준: const 변수가 저장한 객체의 경우 값을 변경했을때,
// 참조변수가 저장하고 있는 참조값이 변경하느냐 아니냐에 따라 달림.
obj.grade = 'A';  // 에러 X
// obj = {language:'한글',grade:'B'}; // 에러 O 
// 실행 하라면, try catch문으로 감쌓야함.
try{
obj = {language:'한글',grade:'B'};
}catch(e){
    console.log("const 변수가 저장한 참조값은 재할당 불가능함.")
}



console.log('\n');
//  경우의 수를 나누는 명령 : if~else,  switch case
var cnt=1;
switch(cnt){
    case 1:
           console.log("1");
           break;  // break 명령이 없으면 아래 case까지 모두 실행됨.
    case 2:
           console.log("2");
           break;
}


console.log('\n');
// 변수의 선언과 사용
// 변수는 사용하기 전에 반드시 선언(생성)이 되어 있어야 함.
// 생성도 사용에 영향을 주지만 초기값도 큰 영향을 발휘함.

// #에러 1. 변수 선언을 하지 않음  (변수가 정의되지 않음.)  : console.log(language); 

// #에러 2. 실행순서상 정의도 안 되고, 초기값도 없어서 에러  : console.log(language); 
//                                                         let language;
let language;
console.log(language); 
// 에러는 안 발생하였지만 출력값이 undefined


// 변수 선언이 뒤에 있지만 , var 변수는 뒤에 정의되든 앞에 정의되든 알빠아니고 에러가 발생하지 않음.
// 다만 초기화 되지 않은 변수의 출력값은 undefinde임.
console.log(music);
var music;


// 아무리 var 변수라도 값만 초기화한 변수는 먼저 사용이 불가능함.
// console.log(painting);
// painting = '수채화';

// 정상적인 변수의 정의와 사용은 먼저 정의하고 값을 채우고 그리고 사용하는 것.


















