const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: "rkdgmlwns" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// nunjucks 설정
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

// 데이터베이스에 대한 설정
const { sequelize } = require('./models');

sequelize.sync({ force: false })
  .then(() => { console.log('데이터베이스 연결 성공'); })
  .catch((err) => {
    console.error(err);
  });

// 로그인 기능 라우터
const indexRouter = require('./routers/index');
app.use('/', indexRouter);

// 회원 기능 라우터
const membersRouter = require('./routers/members');
app.use('/members', membersRouter);

// 서버 포트설정 & 대기시작 명령
app.listen(app.get('port'), () => { console.log(app.get('port'), ' 포트에서 대기중'); });