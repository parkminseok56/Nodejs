const express = require('express')
const Member = require('../models/Member');
const router = express.Router();

router.post('/login',async (req,res,next)=>{
   try{
        const loginUser = await Member.findOne(
            {
                where:{userid:req.body.userid},
            }
        );
        if(loginUser != null && (req.body.pwd == loginUser.pwd)){
            req.session.loginUser = loginUser;
        }  // 검색결과가 있고, 비번이 같으면 세션에 검색 결과를 저장함.
        res.json(loginUser);  // 검색결과가 널이든 아니든 클라이언트로 전송함.
   }catch(err){
       console.error(err);
       next(err);
   } 
});


router.get('/logout', (req,res,next)=>{
  req.session.destroy(function(){
    req.session;
  });
  res.redirect('/');
 });
 
 router.get('/joinform', (req,res,next)=>{
   res.render('memberInsert',{});
});

router.post('/insertMember', async (req,res,next)=>{
  try{
     const member = await Member.create(
      {
        userid:req.body.userid,
        name:req.body.name,
        pwd:req.body.pwd,
        phone:req.body.phone,
        email:req.body.email,
      }
     );
     // res.json(member);
     res.end();
  }catch(err){
    console.error(err);
    next(err);
  }
  
});



module.exports = router;