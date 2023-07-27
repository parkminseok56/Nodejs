const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/User');
// const Kakao = require('./kakaoStrategy');


module.exports = ()=>{
   passport.serializeUser((user, done)=>{  // 정상 로그인이 되었을 때 호출.
      done(null, user.id); // 세션에 로그인 하는게 아닌 , 세션에 아이디만 저장하는 동작.
      // 이 동작 후 '세션에 아이디가 저장된다'라는 건 세션 쿠키에도 암호화된 키로 쿠키가 저장된다는 뜻임.
      // {id:3,'connect.sid : 14561496165 } 와 같은 세션 쿠기가 생성되면서,
      // 브라우져에서 connext.sid 값이 쿠키로 관리되고 이 후로는 아래 디시리얼어라이즈유저로 아이디가 사용
      // (세션값으로 복구 및 사용)됨.
   });
   
   passport.deserializeUser((id, done)=>{
       User.findOne({
           where:{id},
           include:[{
            model: User,
            attributes:['id','nick'],
            as:'Follwers',
           },{
            model: User,
            attributes:['id','nick'],
            as:'Follwings',
           }],
       })
       .then(user => done(null, user))
       .catch(err => done(err));
       // 세션에 저장된 아이디로 쿠키로 user를 복구 req,user로 사용
       // req 내장함수 : req.isAuthenticated()함수 : passport가 req에 추가해준 함수, 
       // 로그인되어 있는 동안 트루값을 리턴함.
   })

   local();
};
