const express = require('express');
const path = require('path');
const app = express();

app.set( 'port',process.env.PORT || 3000);
// app.get()  또는 app.post()등...
// req로 url을 받아 해당 요청에 응답을 보내주는 메서들을 "라우터(Router)"라고 함.
// 라우터의 첫번째 매개변수 전달요소별로 '리퀘스트 키워드'를 요청받아 익명함수를 실행해서 응답합니다.  
// 그 메서드안에 들어가는 익명함수들 ()=>{} 을 "미들웨어" 라고 부릅니다

// 미들웨어 실행만을 위한 라우터가 존재함.
// 1.모든 라우터들이 실행되기 전 실행되는 라우터 
// 보통 다른 라우터들의 위쪽에 작성됨.
// 모든 라운터들이 실행되기 전 실행의 대상으로 인식됨.
app.use((res,res)=>{
    console.log('모든 요청에 실행하고 싶어요');
    nextTick();
    // 모든 라운터에 next가 있지만 사용하지 않아서 생략된 상태임.
    // 필요하면 꺼내서 사용할 수 있음.
    // next()가 없으면 현재 미들웨어 라우터에서 요청에 대한 응답이 종료됨.
    // 미들웨어를 위한 라우터는 반드시 next()를 사용해주세요
});


// '/' 와 '/router' 라는 url로 각각 index1.html, index2.html을 응답 파일로 전송해주세여.
app.get('/',(req,res)=>{
    res.sendFile( path.join(__dirname, '/index1.html'));
 });
 app.get('/router',(req,res)=>{
    res.sendFile( path.join(__dirname, '/index2.html'));
 });
 


app.listen( app.get('port'), ()=>{ console.log( app.get('port'), "포트에서 서버 대기중"); });
