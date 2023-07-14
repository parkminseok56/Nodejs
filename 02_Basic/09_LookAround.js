// 09_LookAround.js

// #### 정방 탐색
// 정규 표현식으로 구분해 내고 매칭한 결과 내용 중, 정규 표현식에 사용되었던 글자를 제외한
// 나머지를 결과로 얻고자 할 때, 예를 들어 http://www.naver.com 에서 '글자들이 반복되고 :
// 으로 끝남' 이라는 정규식이 있다면 결과는 http:가 될테지만 원하는 결과가 ':'을 제외한
// 'http'만을 목적할 때 사용하는 방식임.

let a = 'http://www.naver.com';
// '.' : \n 이 아닌 모든 글자
let result = a.match(/.+:/g);
console.log(result);

a = 'https://www.naver.com';
result = a.match(/.+:/g);
console.log(result);

console.log();
// 정방 탐색을 사용한 예
// 정규식 : (?=정규식 또는 글자)
// 조건에 매칭이 된 후, 해당(?= 뒤로 이어진) 정규식에 있는 글자는 소모하지 않는다.(취하지 않는다.)
a = 'http://www.naver.com';
b = a.match(/.+(?=:)/g);
console.log(b);

a = 'https://www.naver.com';
b = a.match(/.+(?=:)/g);
console.log(b);


// 전방위탐색
// 앞에서 정방탐색이라는 이름으로 매칭하고자 할 때, 버릴 문자와 취할 문자들을 앞, 또는 
// 뒤에서 검색하는것을 말함. 전방위 탐색은 검색하고 버릴 문자를 앞쪽에서 검색함,
// ?<= 정규식

// 후방위 탐색
// 검색 후  버릴 문자를 뒤에서 검색함.ㅣ
// ?=정규식 : 
console.log();

a ='<html><head><title>안녕하세요 반갑읍니다 </title></head><body><div>웹사이트에서 내용을 발취하므니다.</div></body></html>';

// <div></div>가 포함되어져서 추출
result = a.match(/<div>.+<\/div>/g);
// .+  : 글자 반복
// <\div> : </div>의 '/' 가 정규표현식의 종료로 잘못 인식되지 않게 '<\div>' 라고 씀.
console.log(result);

// <div></div>가 제외되고 추출
result = a.match(/(?<=<div>).+(?=<\/div>)/g);
console.log(result);

// 연습문제1
// 위의 a변수의 내용 중 타이틀 내용을 발취해서 출력하시오
result = a.match(/(?<=<title>).+(?=<\/title>)/g);
console.log(result);


// 연습문제2
a = '일반 텍스트 파일 : abc.txt , 자동실행파일: autoexec.bat, 데이터 분석 파일 : bigdata.ai, 더미파일 : gfreag, 알 수 없는 파일 : korea.bar';
// a 변수에서 파일이름. 확장자명으로 구성된 파일명만 골라서 출력하시오. (더미파일에 해당하는 파일 제외 나머지 추출)
result = a.match(/\b\w+[.]\w+\b/g);
console.log(result);

// 연습문제3
//  a변수에서 파일의 확장자가 b로 시작하는 파일을 찾아서 출력하시오
result = a.match(/\b\w+[.][b]\w+\b/g);
console.log(result);