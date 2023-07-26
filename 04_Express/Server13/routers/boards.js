const express = require('express');
const Board = require('../models/Board');
const Reply = require('../models/Reply');  // Reply 모델 추가
const multer = require('multer');
const fs = require('fs');
const path = require('path');
//------------------------------------------------------------------
const { inLogginedIn, isNotLoggedIn, isLoggedIn } = require('./middleware');

// 페이징 설정

//------------------------------------------------------------------


const router = express.Router();

// 업로드용 폴더의 인식 & 생성
try {
    fs.readdirSync('public/upload');
} catch (e) {
    console.error('upload 폴더가 없어 upload 폴더를 생성합니다.');
    fs.mkdirSync('public/upload');
}

const uploadObj = multer(
    {
        storage: multer.diskStorage(
            // 업로드 경로 및 파일이름 설정
            {
                destination(req, file, done) {
                    done(null, 'public/upload/'); //  저장될 경로 설정
                },
                filename(req, file, done) {
                    const ext = path.extname(file.originalname);
                    done(null, path.basename(file.originalname, ext) + Date.now() + ext);  // 저장될 파일이름 설정 a.jpg -> a456789432123.jpg
                },
            }
        ),
        limits: {
            fileSize: 5 * 1024 * 1024
        },
    }
);

//router.get('/',(req, res,next)=>{로그인 여부를 판단하는 미들웨어}), (req, res,next)=>{원래 있어야 하는 미들 웨어}
router.get('/', isLoggedIn, (req, res) => { //isLoggedIn가 실행되었다가 next()를 만나면(req, res)가 실행될 것
    const loginUser = req.session.loginUser;
    res.render('main', { loginUser });


    /*
    if( req.session.loginUser == undefined ){
        res.redirect('/'); //로그인이 안되어 있는 상태면 로그인 창으로 이동
    }else{
        const loginUser = req.session.loginUser;
        res.render('main', {loginUser});
    }
    */
});





// 페이징이 없을 떄
// router.get('/boardList', async (req, res, next)=>{
//     try{
//         const boardList = await Board.findAll(
//             { order:[['id', 'DESC']], }  // 게시물 번호로 내림차순 정렬
//         );
//         res.json( boardList );
//     }catch(err){
//         console.error(err);
//         next(err);
//     }
// });

// 페이징 적용
router.get('/boardList', async (req, res, next) => {
    const paging = {
        page: 1,              // 현재 페이지
        displayPage: 10,      // 표시할 페이지 수
        displayRow: 10,       // 한 페이지에 표시할 게시물 수
        totalCount: 0,        // 총 게시물 수
        beginPage: 0,         // 시작 페이지
        endPage: 0,           // 끝 페이지
        startNum: 0,          // 페이지 시작 레코드 위치
        endNum: 0,            // 페이지 끝 레코드 위치
        prev: false,          // 이전 페이지 존재 여부
        next: false           // 다음 페이지 존재 여부
      };
      
    console.log("page : ", req.params.page);
    // 전달된 페이지가 있다면 현재 페이지로, 그렇지 않다면 현재 페이지1
    if (req.params.page == undefined) {
        paging.page = 1;
    } else {
        paging.page = req.params.page;
    }

    // 게시물 개수 조회
    let count = 0;
    try {
        const result = await Board.findAll();
        count = result.length;
    } catch (err) {
        console.error(err);
        next(err);
    }
    paging.totalCount = count;
    // paging 함수가 하던 일 -----------------------------------------
    paging.endPage = (Math.ceil(paging.page / paging.displayPage)) * paging.diplayPage;
    paging.beginPage = paging.endPage - (paging.displayPage -1);
    let totalPage = Math.ceil( paging.totalCount / paging.displayRow);
    if(totalPage<paging.endPage){
        paging.endPage = totalPage;
        paging.next = false;
    }else{
        paging.next =  true;
    }
    paging.prev = (paging.beginPage==1) ? false : true;
    paging.startNum = (paging.page-1) * paging.displayRow+1;
    paging.endNum = paging.page * paging.displayRow;
    //----------------------------------------------------------------
    console.log(paging.beginPage,paging.endPage,paging.startNum,paging.endNum,paging.page);
    try {
        const boardList = await Board.findAll(
            {  
                offset:paging.startNum, // 조회하고자 하는 게시물의 시작 레코드 위치
                limit: paging.endNum - paging.startNum, // 조회할 레코드의 개수
                order:[['id','DESC']],   // 게시물 번호로 내림차순 정렬
            }  
        );
        res.json(boardList,paging); // res.json({boardList:boardList,paging:paging} );

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/boardView/:id', async (req, res, next) => {

    try {
        // 게시물을 id로 검색(readCount 만)-findOne
        const result = await Board.findOne(
            {
                attribute: ['readCount'],
                where: { id: req.params.id },
            }
        );
        // 검색한 게시물의 조회수를 추출해서 +1 연산
        const cnt = result.readCount + 1;
        // 연산결과의 게시물을 원본에 update - update
        await Board.update(
            {
                readCount: cnt,
            },
            {
                where: { id: req.params.id },
            }
        );
        // 다시 게시물 검색 -  findOne
        const board = await Board.findOne(
            {
                where: { id: req.params.id },
            }
        );
        // render로 전송(로그인 유저, 현재시간도 같이 전송)
        const loginUser = req.session.loginUser;
        const dt = new Date();
        dt.setHours(dt.getHours() + 9);
        res.render('boardView', { loginUser, dt, board });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/writeForm', (req, res, next) => {
    const loginUser = req.session.loginUser;
    res.render('writeForm', { loginUser });
});


router.post('/writeBoard', uploadObj.single('image'), async (req, res, next) => {
    // uploadObj.single('image') : <input type="fiel" req.file.image 로 전송된 파일을, 설정되어 있는 폴더(public/upload)에  설정되어 있는 파일이름(파일명12345678.확장자)으로 업로드 해줍니다.
    try {
        // 파일이 업로드되었을때와, 작성자가 업로드 할 파일을 선택하지 않아서 전송안된 상태를 구분합니다.
        let board;
        if (req.file != undefined) {
            board = await Board.create(
                {
                    subject: req.body.subject,
                    writer: req.body.writer,
                    content: req.body.text,
                    filename: req.file.originalname,  // 전송된 파일이름
                    realfilename: req.file.filename,  // 서버에 저장된 파일이름
                }
            );
        } else {
            board = await Board.create(
                {
                    subject: req.body.subject,
                    writer: req.body.writer,
                    content: req.body.text,
                }
            );
        }
        res.json(board);
    } catch (err) {
        console.error(err);
        next(err);
    }
});




router.get('/replyList/:boardnum', async (req, res, next) => {
    try {
        const result = await Reply.findAll(
            {
                where: { boardnum: req.params.boardnum },
                order: [['id', 'DESC']],
            }
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/replycnt/:boardnum', async (req, res, next) => {
    try {
        const result = await Reply.findAll(
            {
                where: { boardnum: req.params.boardnum }
            }
        );
        res.json({ cnt: result.length });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post('/addReply', async (req, res, next) => {
    try {
        let dt = new Date();
        await Reply.create(
            {
                writer: req.body.writer,
                content: req.body.reply,
                boardnum: req.body.boardnum,
            }
        );
        res.end();
    } catch (err) {
        console.error(err);
        next(err);
    }
});




router.delete('/deleteReply/:id', async (req, res, next) => {
    try {
        await Reply.destroy({
            where: { id: req.params.id },
        });
        res.end();
    } catch (err) {
        console.log(err);
        next(err);
    }
});


router.get('/updateForm/:id', async (req, res, next) => {
    console.log('updateform error')
    try {
        const board = await Board.findOne({
            where: { id: req.params.id },
        });
        const loginUser = req.session.loginUser;
        res.render('updateForm', { board, loginUser });
    } catch (err) {
        console.error(err);
        next(err);
    }

});



router.post('/update', uploadObj.single('image'), async (req, res, next) => {
    try {
        if (req.file != undefined) {
            await Board.update(
                {
                    subject: req.body.subject,
                    content: req.body.text,
                    filename: req.file.originalname,
                    realfilename: req.file.filename,
                }, {
                where: { id: req.body.id },
            }
            );
        } else {
            await Board.update(
                {
                    subject: req.body.subject,
                    content: req.body.text,
                }, {
                where: { id: req.body.id },
            }
            );
        }
        res.send('ok');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/boardViewWithoutConunt/:id', async (req, res, next) => {
    try {
        const board = await Board.findOne(
            {
                where: { id: req.params.id },
            }
        );
        const loginUser = req.session.loginUser;
        const dt = new Date();
        dt.setHours(dt.getHours() + 9);
        res.render('boardView', { loginUser, dt, board });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/deleteBoard/:id', async (req, res, next) => {
    try {
        await Board.destroy({
            where: { id: req.params.id },
        });
        res.redirect('/boards');
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;