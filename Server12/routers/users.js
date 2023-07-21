const express = require('express');

const router = express.Router();

router.post('/insert',async (req,res,next)=>{
    try{
        const inseteduser = await User.create(
            {
                    name: req.body.name,
                    age : req.body.age,
                    married : req.body.married,
    

            }
        );
    }catch(err){
        console.error(err);
        next(err); // 에러 루틴이 있는 라우터로 이동
    }
});
// 1. 레코드 삽입
//    모델명.create({
//       필드명:입력값,
//       필드명:입력값,
//       필드명:입력값,
// });

// User.create({
//        name:'hong',
//        age:24,
//        married:false,
//        comment:'일반회원',
// });

module.exports = router;