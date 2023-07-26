const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const dateFilter = require('nunjucks-date-filter');


const app = express();  // 서버 객체
app.set('port', process.env.PORT || 3000);  // 포트변수 설정
dotenv.config();  // .env 파일 사용 설정
app.set('view engine', 'html');  // 템플릿 엔진 파일 확장자 설정
let env = nunjucks.configure('views',{ express: app, watch:true,}); // 템플릿 엔진 폴더 설정
env.addFilter('date',dateFilter);  // 날짜 데이터 형식 사용 설정
app.use(morgan('dev'));// 서버 클라이언트 요청 응답 표시 설정
app.use(express.static(path.join(__dirname,'public'))); // static 폴더
app.use('/img',express.static(path.join(__dirname,'uploads'))); // 이미지 용 스태틱 폴더 별도 생성


app.use(express.json()); // json 양식 사용 절정
app.use(express.urlencoded({extended:false}));  // req.body 사용 설정 
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 사용
app.use(session({  // 세션 사용
    resave:false,
    saveUninitialized: false,
    secret:process.env.COOKIE_SECRET,
    cookie:{ // session-cookie 설정
        httpOnly:true,
        secure:false,
    },
})) // 한 명의 사용자(클라리언트)에 의해 세션에 한 개이상 특정 값이 저장되면
//  그 값을 사용하는 클라이언트를 구분할 수 있는 쿠기가 자동으로 심어지는데,
//  그 쿠기에 대한 설정임. 세션값이 삭제되거나 브라우저가 닫히면 쿠키값도 사라짐.

const { sequelize } = require('./models');
sequelize.sync({force:false})
.then(()=>{
    console.log('데이터 베이스 연결 성공');
})
.catch((err)=>{
    console.error(err);
});



const pageRouter = require('./routers/page');
const postRouter = require('./routers/post');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
app.use('/',pageRouter);
app.use('/',postRouter);
app.use('/',authRouter);
app.use('/',userRouter);
// app.get('/',(req,res)=>{
//     res.send('<h1>의미없는 라우터</h1>')
// })

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
}); // 해당 요청에 따른 라우터가 없을 때, 404에러
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.error(err);
    res.send('error');
    // res.render('error'); error 발생 시  error.html로 보내라는 뜻
}); // 그 외 에러들

app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
