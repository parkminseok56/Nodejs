 // 04_Array.js
 // 객체가 key:value 형태의 자료의 집합이라면, Array는 key 대신 index(번호)를 사용하여
 // 여러 자료를 한 곳에 모아 사용하는 형태.
 // 다양한 자료를 하나의 범주 안에 넣고, 인덱싱(번호)를 이용해 컨트롤 하는 변수
 var array = [273,'string',true,function(){},{} ,[150,170]];
 console.log(array[0]);
 console.log(array[1]);
 console.log(array[2]);
 console.log(array[3]);
 console.log(array[4]);
 console.log(array[5]);     // { } 비어있다
 console.log(array[5][0]);  // 배열안의 배열 (2차원 배열)
 console.log(array[5][1]);
 console.log(array);
 console.log('\n');

 var arr = ['a','b','c'];
 console.log('변경 전 : ' + arr);

// 배열의 내용을 볼 수 있는 방법 #1 
  console.log( arr);

// 배열의 내용을 볼 수 있는 방법 #2 
for( var i in arr){
    // i는 배열의 index
    // 객체와 다른점 : 객체는 i 자리에 key값이 들어감
    console.log( `index:${i}, value: ${arr[i]}`);
}

// 배열의 내용을 볼 수 있는 방법 #3
// arr.map(); // ()안의 익명함수를 하나 넣을 때 그 익명함수를 배열의 요소들을 대상으로 한 번씩 실행.
// arr.map(function(){});

arr.map(function(value,idx){
      // value : 배열의 요소들이 한 번 씩 저장될 변수
      // idx : 그 요소들의 첨자
      console.log( `index:${idx},value:${value}`);
});



