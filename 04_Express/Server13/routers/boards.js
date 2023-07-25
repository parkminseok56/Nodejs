const express = require('express')
const Board = require('../models/Board');
const router = express.Router();

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


module.exports = router;