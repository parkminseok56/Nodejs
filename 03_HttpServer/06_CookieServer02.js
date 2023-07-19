// 06_CookieServer02.js
const http = require('http');
const fs = require('fs').promises;

// 로그인 페이지에서 로그인을 하면 요청되면 주소
// http://localhost:3000/login?name=scott

http.createServer(async(요청,응답)=>{
    let name='일지매';
    let login = false;
    
    if(요청.url.startsWith('/login')){         
           // 로그인하려는 유저의 전송된 이름을 쿠키에 저장하고 '/' 로 이동\
           // console.log(name);
           const expires = new Date(); // 오늘 날짜.현재 시간 생성, 저장
           expires.setMinutes(expires.getMinutes() + 1); //   오늘 날짜.현재 시간 + 1분
           응답.writeHead( 302,{
            Location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; 
            Expires=${expires.toGMTString()}; 
            HttpOnly; 
            Path=/`,
           });  // 쿠키에 원하는 정보를 심는 동작
           login = true;
           응답.end();
    }else if( login){ // 첫 페이지이거나 로그인 후에 다시 돌아가거나
         // 쿠키에 로그인 정보가 저장되어 있는지 확인한 후 '일지매님 반갑읍니다'를 표시
            응답.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
            응답.end(`${name}님 안녕하시므니까`);
    }else{
            try{
                const data = await fs.readFile('./06_login.html');
                응답.end(data)
                }catch(에러){
                    응답.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
                    응답.end(에러.message);
                }
         }
}).listen(3000, ()=>{console.log('3000 포트 서버 대기중.'); });
