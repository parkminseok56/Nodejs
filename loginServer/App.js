const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.set('port', process.env.PORT || 3000);

// 뷰 엔진 설정 (EJS 사용)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_session_secret', // 세션 시크릿 키
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// passport를 passport.js에 정의된 전략들과 함께 구성
require('./passport');

// LoginUser 모델 생성 (이미 생성되어 있다면 생략 가능)
const { sequelize } = require('./models');
const LoginUser = require('./models/loginUser');

sequelize.sync({ force: false })
  .then(() => { console.log('데이터베이스 연결 성공'); })
  .catch((err) => {
    console.error(err);
  });

// 로그인과 인증에 대한 라우트 생성
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// 메인 라우트: req.user를 loginUser로 사용하여 결과 페이지 렌더링
app.get('/', (req, res) => {
  const loginUser = req.user ? { nickname: '안녕하세요' } : null;
  res.render('main', { loginUser });
});

// ... 기타 라우트와 미들웨어 ...

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(app.get('port'), ' 포트에서 대기중');
});