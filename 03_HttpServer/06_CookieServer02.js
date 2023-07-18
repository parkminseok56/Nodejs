// 06_CookieServer02.js
const http = require('http');
const fs = require('fs').promises;

// 로그인 페이지에서 로그인을 하면 요청되면 주소
// http://localhost:3000/login?name=scott
http.createServer(async(요청,응답)=>{
    let name='일지매';
    
    const cookies = {};
    
    if(요청.url==='/login'){         
           // 로그인하려는 유저의 전송된 이름을 쿠키에 저장하고 '/' 로 이동
           expires.setMinutes(expires.getMinutes() + 1);
           응답.writeHead( 302,{
            Location: '/',
            'Set-Cookie' : `name=${name}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
           });
           응답.end();
    }else if( 요청.url === '/'){ 
         // 쿠키에 로그인 정보가 저장되어 있는지 확인한 후 '홍길동님 반갑읍니다'를 표시
         if( cookies.name) {
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
    }

}).listen(3000, ()=>{console.log('3000 포트 서버 대기중.'); });
