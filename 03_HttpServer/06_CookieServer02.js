// 06_CookieServer02.js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const { parse } = require('path');

// 로그인 페이지에서 로그인을 하면 요청되면 주소
// http://localhost:3000/login?name=scott
// let login = false;
// let name='일지매';

const parseCookies = (cookie='')=>{
     // 두 개 이상의 쿠키가 있을 수 있으므로 ';' 으로 구분하여 배열로 저장함.
     // 전달된 쿠기 "mycookie=test;  name=scott"
    let c = cookie.split(';')
    console.log("split; ", c);   
    // ; 으로 분리한 결과        [ 'mycookie=test', 'name-scott']
    let d = c.map((val, idx)=>{
         let a = val.split('=');   // ';' 으로 분리된 쿠키들은 = 기준으로 분리해서 저장.
         return a;
    } );
    console.log("split = " , d); 
    // = 로 분리한 결과      [ [ 'mycookie=test', 'name-scott'], ['name', 'scott] ]
    let e = d.reduce((acc,[k,v])=>{
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, { } );   // 인코딩으로 저장한 쿠키값을 다시 디코딩해서 저장.
    console.log(e);   // 분리된 결과들은 키:값 형태로 객체로 변환함.
    return e;
}

http.createServer(async(요청,응답)=>{
    // 쿠키의 내용은 요청(requset)이 있을 때 마다,  매 번 헤더에 동봉되어져서 서버로 옴.
    console.log(요청.headers.cookie);
    const cookies = parseCookies( 요청.headers.cookie);
    //console.log(cookies);


    if(요청.url.startsWith('/login')){         
           // 로그인하려는 유저의 전송된 이름을 쿠키에 저장하고 '/' 로 이동
           //console.log(요청.url);  // login?name=""
           const { query } = url.parse(요청.url); // 요청.url에서 ? 이후를 분리
           //console.log(query);
           const { name } = qs.parse(query);  // name=""에서 ""만 분리
           // console.log(name);
           const expires = new Date(); // 오늘 날짜.현재 시간 생성, 저장
           expires.setMinutes(expires.getMinutes() + 1); //   오늘 날짜.현재 시간 + 1분
           응답.writeHead( 302,{
            Location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly;Path=/`,
           });  // 쿠키에 원하는 정보를 심는 동작
           login = true;
           console.log(login);
           응답.end();
    }else if( cookies.name ){ // 첫 페이지이거나 로그인 후에 다시 돌아가거나
         // 쿠키에 로그인 정보가 저장되어 있는지 확인한 후 '일지매님 반갑읍니다'를 표시
            응답.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            응답.end(`${cookies.name}님 안녕하시므니까`);
    }else{
            응답.writeHead(200,{ 'Set-Cookie': 'mycookie-test'});
            try{
                const data = await fs.readFile('./06_login.html');
                응답.end(data)
                }catch(에러){
                    응답.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                    응답.end(에러.message);
                }
         }
}).listen(3000, ()=>{console.log('3000 포트 서버 대기중.'); });
