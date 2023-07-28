const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

// 일반회원 가입
router.post('/join', async (req, res, next) => {
    // const email = req.body.email;
    // const nick = req.body.nick;
    // const password = req.body.password;
    // req.body 객체 -> { email:'hong1@abc.com', nick:'홍길남', password:'1234' }
    // 객체의 구조분해를 통해 세줄로 썻던 코드들을 한줄로 쓸 수 있습니다.
    const { email, nick, password } = req.body;
    try{
        const exUser = await User.findOne(
            {
                where : { email }, // 하나만 써도 인식이됨. (where : { email : email }) 과 동일한 코드
            }
        ); // 전송된 이메일이 이미 회원가입 된 이메일인지 확인을 위해 검색
        if( exUser ){ // exUser에 뭔가 들어있다면,
            return res.redirect('/join?joinError=이미 존재하는 이메일입니다');
        }   // 이메일이 이미 존재한다면 회원가입 폼으로 되돌아갑니다.

        // password 를 암호화합니다.
        // 해커에 의해서 DB가 털리더라도 비밀번호를 알려주지 않기 위함으로 암호화 사용합니다.
        const hash = await bcrypt.hash(password, 12);   // 암호화할 때 사용할 인수입니다.
        // 12 : 해쉬화를 하기위한 복잡도 인수. 숫자가 클수록 해시화 암호화가 복잡해지고 복구시간도 오래걸립니다. 12가 약 1초 정도 시간의 실행을 해줍니다.

        await User.create({
            email,
            nickname : nick,  // 들어갈 필드 명과 변수명이 같으면 하나로 써도 됩니다. 
            // 필드명에서 nickname이라구 써서 객체의 구조분해를 했을 때도 nickname으로 고쳐져서 이처럼 (nickname,) 넣었지만, 인식을 하지못하고
            // User.nickname cannot be null 이라고 뜹니다. 따라서 여기선 변수명을 nick으로 받고 필드명과 변수명을 다 넣어줘서 User를 추가해줍시다.!!ㅠㅠ
            // 해결방안 고려중...
            password : hash,
        });  // 사용자 추가
        return res.redirect('/');

    }catch(err){
        console.log(err);
        next(err);
    }
});

// 로그인을 눌렀을 때 여기로 먼저와서 이 안에서 미들웨어 done으로 전달될 함수입니다.
router.post('/login', (req, res, next) => {
    // passport 모듈로 로그인을 구현합니다.
    // 'local' : 일반 로그인을 하려고 보내는 전달인수
    // ()=>{} : 그 때 보내서 실행할 전달인수로서의 익명함수 -> 함수의 전달인수로 함수를 넣을 수 있습니다.
    // authErr, user, info : authenticate 함수가 실행되면 그 안에서 전달된 함수를 호출할텐데 그 때 넣어준 값을 받을 매개변수들
    // passport.authenticate('local', (authError, user, info) => {})(req, res, next);
    // 일반로그인은 'local'
    // (authError, user, info) => { })(req, res, next) : 정상 로그인 되거나, 에러가 있거나, 아이디가 없거나, 비번이 틀리거나 했을 때 처리해 줄 함수
    // localStrategy.js 에 있는 미들웨어 done으로 전달될 함수입니다.
    passport.authenticate( 
        'local',    // locaStrategy.js 안의 미들웨어를 호출하기 위한 키워드
        (authErr, user, info) => {
            // 로그인이 성공하면 user 에는 현재 로그인한 사람의 정보가 담깁니다.
            // 로그인 중에서 서버에러가 있다면 서버에러 처리됩니다.
            // 이 때 authErr 에러의 내용이 전달됩니다.
            if(authErr){    // authErr
                console.error(authErr);
                return next(authErr);
            }
        
            // 로그인하려는 이메일의 주인공이 사용자 목록에 없을 때
            if (!user){ // user 가 null or undefined 라면
                return res.redirect(`/?loginError=${info.message}`);
                // '/' 첫페이지로 이동하는 url
                // loginError=${info.message} 파라미터 같이 전달
            }
            
            // 여기서부터 정상 로그인(세션에 사용자 정보를 넣고 첫 페이지로 이동)
            // req안의 login 이라는 멤버함수는 원래는 없는 함수입니다. passport가 설정되면서 req안에 정의되어 추가됩니다.
            // 세션에 로그인 유저를 저장하고 쿠키에 s.id 를 저장합니다.
            return req.login(user, (loginError) => {
                if(loginError){ // index.js 에서 보낸 에러가 있으면 에러처리
                    console.error(loginError);
                    return next(loginError);
                }
                // 현재위치에서 세션 쿠키가 브라우져로 보내어집니다.
                return res.redirect('/');
                // 최종 마지막으로 가는 곳입니다. 에러가 없을 시
            });
        }   
    )(req, res, next);   // 미들웨어 내의 미들웨어에는 뒷 쪽에 (req, res, next)를 붙입니다.
});

router.get('/logout', (req, res) => {
    // req.logout();
    req.session.destroy();  // 세션 쿠키 삭제
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));


router.get('/kakao/callback',
    passport.authenticate(
        'kakao',
        {
            failureRedirect: '/',
        }
    ),  //모든 로그인 절차를 마치고 다음 미들웨어 실행해서 첫페이지로 이동
    (req, res) => {
        res.redirect('/');
    }
);

module.exports = router;