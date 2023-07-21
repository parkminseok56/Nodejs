const express = require('express');
const User = require('../models/user');
const { where } = require('sequelize');

const router = express.Router();

router.post('/insert',async (req,res,next)=>{
    try{
        const inserteduser = await User.create(
            {
                    name: req.body.name,
                    age : req.body.age,
                    married : req.body.married,
            }
        );
        res.json(inserteduser);
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

router.get(`/`, async (req,res,next)=>{
    try{
        // 검색 조건 없는 모든 레코드 조회
        const users = await User.findAll({});
        res.json(users);
    }catch(err){
        console.log(err);
        next(err);
    }
});


module.exports = router;


// 2. 일반 조회 ( 모든 필드, 모든 레코드)
// 모델명.findAll({});
// User.findAll({});

// 3. 일부 필드만 조회 (select name, married from users)
// User.findAll({
//    attributes:['name','married'],
//    })

// 4. 일부 필드 & 일부 레코드(where 조건) 조회
//        -select name, age from users where married=1 and age>30
//        User.findAll({
//          attributes:['name','age'],
//            where:{
//               married:1, age:{[Op.gt]:30},
//            },
//    });
//  where 절에 두 개의 조건이 별도의 언급없이 ',' 로 이루어져 있다면, 그 둘은 and로 묶여있는것임.

// or를 쓸려면
//  select id, name from users where married = 0 or age<30
//   User.findAll({
//    attributes:['id','name'],
//            where:{
//              [Op.or] : [{married:1}, {age:{[Op.gt]:30}}],
//            },
// });

// 5. Select id, name from users order by age desc;
//   User.findAll({
//    attributes:['id','name;'],
//           order:[['age', 'desc']]          
// });

// select id, name from users order by age desc, id asc;
//   User.findAll({
//    attributes:['id','name'],
//             order:[['age', 'desc'], ['id','asc']],       
// });


