const express = require('express')
const Board = require('../models/Board');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const router = express.Router();

// 업로드용 폴더의 인식 & 생성
try{
fs.readdirSync('public/upload');
}catch(e){
    console.error('upload 폴더가 없어서 새로운 upload 폴더를 생성했음');
    fs.mkdirSync('public/upload');
}

const uploadObj = multer(
    {
        storage:multer.diskStorage(
               //   업로드 경로 및 파일 이름 설정 
               {
                  destination(req,file,done){
                    done(null,'public/upload/');   // 저장될 경로 설정
                  },
                  filename(req,file,done){
                    const ext = path.extname(file.originalname);
                    done(null,path.basename(file.originalname,ext) + Date.now() + ext);
                    // 저장될 파일 이름 설정 a.jpg -> a456789452123.jpg
                  },
               }
        ), 
        limits:{
            fileSize: 5 * 1024 * 1024
        },  

    }
);



router.get('/', (req,res)=>{
    const loginUser = req.session.loginUser;
    res.render('main',{loginUser});
});

router.get('/boardList',async(req,res,next)=>{
    try{
        const boardList = await Board.findAll(
            { order:[['id','DESC']],}  // 게시물 번호로 내림차순 정렬
        );
        res.json( boardList);

    }catch(err){
        console.error(err);
        next(err);
    }
});


router.get('/boardView/:id', async (req, res, next) => {
    try {
        // 게시물을 id로 검색 (readCount만) - findOne
        const result = await Board.findOne(
            { 
                attributes:['readCount'],
                where : {id: req.params.id},
            });

        // 검색한 게시물의 조회수를 추출해서 +1 연산
        const  cnt = result.readCount + 1;

        // 연산 결과의 게시물을 원본에 update - update
        await Board.update(
            { 
                readCount: cnt,
            },
            {
                where:{id:req.params.id},
            }
            );

        // 다시 게시물 검색 - findOne (업데이트된 게시물 가져옴)
        const board = await Board.findOne(
            { 
                where:{id:req.params.id},
            }
            );

        // render로 전송(로그인 유저, 현재 시간도 같이 전송)
        const loginUser = req.session.loginUser;
        const dt = new Date();
        res.render('boardView', {  loginUser, dt, board });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/writeForm',(req,res,next)=>{
    const loginUser = req.session.loginUser;
    res.render('writeForm',{loginUser});
});


router.post('/writeBoard',uploadObj.single('image') , async (req,res,next)=>{
    // uploadObj.single('image') : <input type="file" req.file.image 로 전송된 파일을 ,
    // 설정되어 있는 폴더(public/upload)에 설정되어 있는 파일이름(파일명12345678.확장자)로 업로드 해줌
    try{
           // 파일이 업로드 되었을때, 작성자가 업로드 할 파일을 선택하지 않아서 전송 안 된 상태를 구분함.
           let board;
           if(req.file != undefined){
              board = await Board.create(
                {
                    subject : req.body.subject,
                    writer: req.body.writer,
                    content: req.body.text,
                    filename:req.file.originalname,  // 전송될 파일 이름
                    realfilename:req.file.filename,  // 서버에 저장된 파일 이름
                }
              );
           }else{
              board = await Board.create(
                {
                    subject : req.body.subject,
                    writer: req.body.writer,
                    content: req.body.text,
                }

              );
           }
           res.json(board);
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.get('/replyList/:boardnum', async(req,res,next)=>{

});


router.get('/replycnt/:boardnum', async(req,res,next)=>{

});

module.exports = router;