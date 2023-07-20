const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.set('port', process.env.PORT || 3000); 

// 파일을 업로드 하려면 업로드될 폴더가 지정되어야함.
// spring떄 처럼 폴더를 직접 만들지 않습니다. fs 모듈에 있는 기능을 이용해서 폴더를
// 검색하고 없으면 생성하게 함.
// 서버 내의 저장장치나 외부기기와의 통신은 언제든 에러요소가 존재하므로 try-catch를 사용함.
// fs 모듈의 readdirSync 함수(폴더의 내용을 읽는 기능)를 사용할텐데, 읽을 폴더가 없으면
// 에러가 발생하고, 이를 예외처리해서 폴더를 생성할 예정임.
try{
    fs.readdirSync('uploads');
 }catch(e){
    console.error('uploads 폴더가 없어서 uploads 폴더를 생성함.');
    fs.mkdirSync('uploads');
 }
 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/multer.html'))
});

app.post('/upload',(req,res)=>{

});

app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
