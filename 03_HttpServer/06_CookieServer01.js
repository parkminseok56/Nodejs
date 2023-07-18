//06_CookieServer01.js
const http = require('http');
http.createServer((요청,응답)=>{
    // 클라이언트의 요청(req)에는 요청 header에 쿠키가 자동으로 동봉됨.
    console.log(요청.url, 요청.headers.cookie);
    응답.writeHead(200, { 'Set-Cookie' : 'mycookie=test'});
    응답.end('<h1>Hello Cookie</h1>')

}).listen(3000, ()=>{console.log('3000 포트 서버 대기중.'); });

// #쿠키 
// 요청(request)의 단점 : 누가(어떤 client)가 보낸 요청인 줄 알 수 없다.
// 요청으로 ip 주소와 브라우저 정보 정도는 알 수 있다.
// 이를 해결하기 위해 쿠키를 이용한다.
// 쿠기 -키:값의 쌍으로 이루어져있는 데이터임.
// 매 요청(request)마다 서버에 쿠키가 동봉되어서 보내짐
// 서버는 쿠키를 읽어서 누구인지 파악함.

// 쿠키를 직접 넣어서 구현하려면
// writeHead메서드를 이용해서 요청 헤더에 입력함.
// 내용은 Set-Cookie로 브라우져에 쿠키를 설정하라고 명령함.

// http요청과 응답은 헤더와 본문을 갖음.
// 헤더는 요청 또는 응답의 정보내용을 담고 있음.
// 본문은 주고 받는 실제 데이터를 담고 있음.
// 쿠키는 부가적 정보이므로, 헤더에 저장함.