// kakaoStrategy.js
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/User');

module.exports = ()=>{
   passport.use(
    new KakaoStrategy(
        {
            clientID : process.env.KAKAO_ID,
            callbackURL: '/auth/kakao/callback',
        },
        async (accessToken,refreshToken,profile,done)=>{
            console.log('kako profile',profile);
            try {
                const exUser = await User.findOne({
                    where: { snsid:profile.id, provider: 'kakao'},
                });
                if(exUser){
                    done(null, exUser); // 아이디가 존재하면 검색결과, 회원정보(exUser)를 갖고 바로 done(null,exUser)
                    //로 복귀하며, 로그인 절차(세션 쿠기에 저장 등)을 실행함.
                }
            } catch (err) {
                console.error(err);
                done(err);
            }
        }
    )
   );
};