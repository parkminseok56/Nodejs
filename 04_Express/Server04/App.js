const express = require('express');
const path = require('path');

// 쿠키와 세션 등의 사용을 위한 추가 설치 모듈 require ----------------------------------------
// 각각의 요청과 응답에 대한 필요정보를 보기 위한 모듈
const morgan = require('morgan');
// 쿠기 사용을 http 서버 때 보다 간결하게 사용하기 위한 모듈
const cookieParser = require('cookie-parser');
// 세션 사용을  http 서버 때 보다 간결하게 사용하기 위한 모듈
const session = require('express-session');
// 요청의 본문을 해석 및 구분하는 모듈 ( 구 버전이랑 사용 안 함.)
const bodyParser = require('body-parser');
// ====================================================================================================



const app = express();
app.set('port', process.env.PORT || 3000);  // 서버 내에서 사용할 전역 변수

// 추가 설치 모듈 위한 설정 -> 미들웨어들을 이용해서 설정
app.use(morgan('dev'));
// 실행결과 : GET / 200 5.316 ms - 165
// metohd 방식 , 응답 결과 코드, 요청과 실행에 걸린 시간 등등..
// app.use(morgan('combined')); 더 자세한 내용을 볼 수 도있음.

// 쿠키 파서 사용을 위한 설정.
app.use(cookieParser());

// 세션 활용을 위한 설정
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"abcd",  // 암호화 코드
}));

// express에 내장된 바디파서 사용을 위한 설정
app.use(express.json()); // 바디파서 json : json 사용을 위한 모듈
app.use(express.urlencoded({extended:true})); // 바디파서 폼 데이터 모듈

// =============================================================================  여기까지가 미들웨어 영역
// 여기부터 각 요청에 응답할 라우터들(에러처리 라우터 포함) 
// 라우터: 컴퓨터 네트워크에서 데이터를 전달하고 연결하는 장치. 
// 인터넷을 포함한 네트워크에 여러 컴퓨터 또는 장치를 연결하는데 사용됨.

app.get('/', (req,res)=>{
    // http 서버에서 쿠키를 가공해서 원하는 항목을 꺼내는 방법
    /* cookie.split(';').map(v => v.split('=')).reduce((acc,[k,v]))=>{
        acc.[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {}); */
    
    // express 서버에서 보내온 쿠키에서 원하는 name 값을 꺼내는 방법
    console.log(req.cookies.name);
    if( req.cookies.name){
        res.send(`${req.cookies.name} 님 안녕하세여` + `<br><a href="/logout">로그아웃</a>` );
    }else{
        res.sendFile(path.join(__dirname,'/index.html'));
    }
})


app.post('/login',(req,res)=>{
    // http://localhost:3000/login?name=hong

    // http 서버에서 전송된 파라미터를 가공하는 방법
    // const { query } = url.parse( req.url );
    // const { name } = qs.parse( query );

    // express 서버에서 전달 파라미터를 활용하는 과정
       const name = req.body.name;
       console.log( req.body.name);
    
    // http 서버에서 쿠키에 필요한 내용을 심는 방법
    //   res.writeHead(200,{ 'Set-Cookie': 'mycookie=test'});
    /*  res.writeHead(
        302,
        { Location: '/',
         'Set-Cookie' : `name=${encodeURIComponent}(name)}); Expires=${expires.toGMTString()}; HttpOnly;
         Path=/`,
    }
);   
*/
    // express 서버에서 쿠키에 필요한 내용을 심는 방법
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 1);
    res.cookie(
        'name',
        encodeURIComponent(name),
        {
            expires : expires,
            httpOnly : true,
            path :'/'
        }
    );
    // express 쿠기 입력에는 Location이 없기 떄문에 쿠키를 심고 이동할 경로를 별도로 지정해줌.
    res.redirect('/');
});

app.get('/logout',(req,res)=>{
    // 쿠키의 삭제
    res.clearCookie(
        'name',
        req.cookies.name,  // encodeURIComponent(name),
        { httpOnly:true,path: '/'}
    );
    res.redirect('/');
});
 


app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
