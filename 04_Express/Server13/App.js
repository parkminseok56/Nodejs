const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 변수에 저장된 모듈들은 초기설정 등을 실행해서 사용 가능 상태로 설정함
const app = express();
app.set('port', process.env.PORT || 3000);
app.use('/',express.static(path.join(__dirname,'public'))); // 스태틱 폴더 설정
// app.use('/up',express.static(path.join(__dirname,'upload'))); // 스태틱 폴더는 두 개 이상 만들 수 있음.
// 그러려면 접근 경로를 서로 다르게 지정해줘야함. '/up'

const dateFilter = require('nunjucks-date-filter');
//넌적스에서 사용할 날짜 양식 필더 사용를 위한 모듈
app.set('view engine', 'html'); // 넌적스 파일 확장자
let env = nunjucks.configure('views',{express: app, watch:true}); //넌적스 설정
env.addFilter('date',dateFilter);

app.use(cookieParser());
app.use(session({resave:false, saveUninitialized:false,secret:"rkdgmlwns", }));
app.use(express.json()); //json 데이터 사용 설정
app.use(express.urlencoded({extended:false})); // req.body에 관한 사용 설정

const indexRouter = require('./routers');
const membersRouter = require('./routers/members');
const boardsRouter = require('./routers/boards');

// app.set('view engine', 'html');
// env.addFilter('date', dateFilter);

app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/boards', boardsRouter);

// 데이터베이스에 대한 설정
const {sequelize} = require('./models');

sequelize.sync({force:false})
.then(()=>{ console.log('데이터베이스 연결성공');})
.catch((err)=>{console.error(err);})


// app.get('/',(req,res)=>{
//     res.send('<h1>Node.js에서 제작한 게시판</h1>');
// });

//서버 운영중 라우팅 또는 그 외 에러가 발생하면 이동하여 처리될 에러처리 라우터
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');  
});

app.listen(app.get('port'), () => {console.log(app.get('port'), '번 포트에서 대기 중');});

