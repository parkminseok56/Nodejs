const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.set('port', process.env.PORT || 3000); 

// static 폴더 설정
app.use('/', express.static(path.join(__dirname,'uploads')));

// 업로드 폴더 생성
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
 
// multer 객체를 설정하고, 폴더와 파일 이름을 설정
// const upload = multer({storage:multer.diskStorage(), limits:{}});
const upload = multer(
    {
        storage:multer.diskStorage(
            {   
                // 경로 설정에 관한 함수
                // done : 전달인수로 익명함수를 전달받아 done() 호출하는 매개변수
                destination(req, file, done){
                    done(null,'uploads/');
                    // multer 모듈에서 done 매개변수에 이미 정해진 익명함수를 전달함.
                    // 그 익명함수가 뭔지 모르겠지만 전달받은 매개변수이름 done 을 이용해서 호출하면
                    // (done(null, 'upload/')) 업로드 파일 저장소가 설정완료됨
                },
                // 저장될 파일이름에 관한 함수
                filename(req, file, done){
                    const ext = path.extname(file.originalname);  // 확장자 추출
                    const fn = path.basename(file.originalname,ext) + Date.now() +
                    ext; // 확장자를 제외한 파일이름 + 현재 날짜 시간 + 확장자
                    done( null, fn);
                    // 저장될 파일 이름이 설정됨.
                },
            }
        ),
        limits:{
            fileSize: 5 * 1024 * 1024 
        },
    }
);







app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/multer.html'))
});

app.post('/upload',upload.single('image'),(req,res)=>{
        // upload.single('image')로 파일을 업로드함.
        console.log(req.file.originalname);
        console.log(req.body.title);
        return res.json({title:req.body.title, filename:req.file.fieldname});
});

app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
