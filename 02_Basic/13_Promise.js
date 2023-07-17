// 13_Promise.js

// Promise를 직접 구성하여 참조변수에 저장
// const pm  = new Promise( /* 익명함수*/);
let condition = true;
function create(){
    return new Promise(
        (resolve, reject)=>{
            if(condition){
                resolve();
                console.log("1:resolve");
            }else{
                reject();
                console.log("2: reject");
            }
        }
    );
};
//const pm = create();
//pm.then().catch().finally();
create()
.then(
      ()=>{
           console.log("3.성공");
      }
).catch(
    ()=>{
        console.log("4.실패");
   }
).finally(
    ()=>{
        console.log("5.종류예정");
   }
);
console.log("6.종류");


