// 02_Server02.js

const { error } = require('console');
const http = require('http');

const Server = http.createServer((req,res)=>{
    res.write('<h1>Hello Node Server!!</h1>');
    res.write('<h2>Here is My Second Server!!</h2>');
    res.write('<h3>Welcome to My Node Server!!</h3>');
});
Server.listen(3000);
Server.on('listening', ()=>{console.log('3000포트에서 서버 시작');});
Server.on('error',(error)=>{ console.error(error);});
// 서버 오픈에 에러가 발생했을때, 해당 에러메시지를 console.error()메서드를 이용해서 출력함.