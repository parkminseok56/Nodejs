const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');  // 템플릿 엔진 사용을 위한 require

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.set('port', process.env.PORT || 3000); 

app.set('view engine', 'html');
nunjucks.configure('views',{   
    // views: 템플릿엔진이 렌더링하기 위한 파일들이 모여있는 폴더이름
    // 넌적스가 화면에 표현할 데이터와 함께 라우터와 함께 이동할 html 파일들
    express: app,
    watch : true,
}); // 넌적스 템플릿 엔진을 사용하기 위한 설정

app.get('/',(req,res)=>{
    // 넌적스 템플릿 엔진에 의한 이동은 res.render를 사용함
    res.render('index',{title:'Express'});
    // 넌적스를 이용해서 html 파일을 클라이언트에 보낼때, 그 파일에 전달해줄 데이터를
    // 위와 같이 객체형식으로 하나 이상 같이 태워 보낼 수 있음.
    // 스프링에서의 request.setAttribute, model.addAttribute, mav.addObject이랑 비슷한 기능임.
});

app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
