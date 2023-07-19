const express = require('express');
const path = require('path');
const app = express(); 

app.set( 'port',process.env.PORT || 3000);
// app.get()  또는 app.post()등...
// req로 url을 받아 해당 요청에 응답을 보내주는 메서들을 "라우터(Router)"라고 함.
// 라우터의 첫번째 매개변수 전달요소별로 '리퀘스트 키워드'를 요청받아 익명함수를 실행해서 응답합니다.  
// 그 메서드안에 들어가는 익명함수들 ()=>{} 을 "미들웨어" 라고 부릅니다

// 미들웨어 실행만을 위한 라우터가 존재함.
// 1.모든 라우터들이 실행되기 전 실행되는 라우터 
// 보통 다른 라우터들의 위쪽에 작성됨.
// 모든 라운터들이 실행되기 전 실행의 대상으로 인식됨.
app.use((req, res, next)=>{
    console.log('모든 요청에 실행되여');
    next();
    // 모든 라운터에 next가 있지만 사용하지 않아서 생략된 상태임.
    // 필요하면 꺼내서 사용할 수 있음.
    // next()가 없으면 현재 미들웨어 라우터에서 요청에 대한 응답이 종료됨.
    // 미들웨어를 위한 라우터는 반드시 next()를 사용해주세요
});

// 2. 특정 리퀘스트에서만 실행할 미들웨어
app.use('/router',(req,res,next)=>{
    console.log('router 요청에만 실행됨');
    next();
});
// get과 post등 모든 method에서 리퀘스트 키워드만 같으면 실행됨.
// 실행 후 next()로 인해 제어권이 아래로 이동하여, 해당 get이나 post 등이 추가 실행됨.
app.get('/about' , (req, res)=>{
    res.send('<h2>Hello, About</h2>');
});

//..............................................


// 3-1. 정상 라우터 또는 미들웨어 실행 중 에러가 발생했으때
app.use((req, res,next)=>{
   //  throw new Error("서버-에러를 발생시켜주겠스므니다.");
   // 현재 코드는 에러의 상세내용이 console창에서도 나오고 브라우저 창에도 나옴.
   // 브라우저에 에러내용을 나오지 않게 하려면 1차적으로 try~catch를 이용하고
   // 두 번째로 에러처리 라우터를 만들어서 사용함.
   
    // 4. 에러 처리의 또다른 형태
    /*try{
        console.log(정의안된변수사용);
    }catch(error){
        next(error); // 에러처리 미들웨어로 이동하라는  next
        // next에 error 가 인수로 들어가면 에러처리 라우터로 이동합니다
        // error 말고 'router' 가 인수이면 다음 미들웨어로 이동하라는 뜻입니다.
    }*/
    next(); // 에러와 상관없이 미들웨어에 항상 있어야 하는 next();
});

app.get('/' , (req, res, next)=>{    
    res.sendFile( path.join(__dirname, '/index.html') );
});

app.get('/abc' , (req, res, next)=>{    
    res.sendFile( path.join(__dirname, '/index1.html') );
});


// 6.라우터와 파라미터
// express 서버 역시 req.url에 일부로 피라미터를 사용할 수 있음.
// https 서버에서는 이를 '/'로 split 해서 사용하거나 parsing 해서 사용했다면,
// express 서버에서는 이를 바로 변수에 담아서 사용함.
app.get('category/Boots',(req,res)=>{
    res.send( `<h2>hello Boots</h2>`);
 });
 app.get('category/Heel',(req,res)=>{
    res.send( `<h2>hello Heel</h2>`);
 });
// 와일드 카드 키워드를 사용한 라우터는 범위가 넓으므로 가능한
// 아래 쪽에 위치시켜서, 명확한 구부은 먼저 실행되게 하고,
// 해당 라우터가 없을 때 실행되게 하는 것이 효과적임.
app.get('category/:name',(req,res)=>{
    res.send( `<h2>hello Wild Chard ${req.params.name}</h2>`);
 });




// 5. 404 에러 처리
// 위의 모든 라우터를 검색하다가 해당 라우터가 없어서 현재 미들웨이를 만나면 404에러가 발생한것이므로,
// 이 미들웨어는 맨 아래 또는 에러 처리 라우터 바로 위에 위치시킴.
app.use((req,res,next)=>{
    res.send('비정상적 접근~!! 에러입니다~!!');
    //res.status(404).send('404 에러임~!!');  // 400과 500은 위험
});


// 3-2. 에러 처리 라우터
app.use( ( err, req, res, next )=>{
    console.error(err);
    res.status(200).send('에러내용을 브라우져에 알려주지 않으리');
});
 // 이 라우터는 "라우터 살행" 또는 미들웨이에서 에러가 발생했을 때, 실행되는 미들웨아임.
 // 에러 처리 라우터에 있는 미들웨이는 반드시 매개변수가 err,req, res,next 네 개 쓰여야 인식함.
 // 넷 중에 하나만 빠져도 에러 처리 라우터로 인식 못함. 

// '/' 와 '/router' 라는 url로 각각 index1.html, index2.html을 응답 파일로 전송해주세여.
app.get('/',(req,res)=>{
    res.sendFile( path.join(__dirname, '/index1.html'));
 });
 app.get('/router',(req,res)=>{
    res.sendFile( path.join(__dirname, '/index2.html'));
 });
 


app.listen( app.get('port'), ()=>{ console.log( app.get('port'), "포트에서 서버 대기중"); });


// 7.미들웨어의 특성
// 하나의 미들웨어에서 res.send() 또는 res.sendFile() 등을 두번이상 쓸수 없습니다. 
// res.json() 도 예외는 아닙니다.
// http 서버에서 사용하던 res.writeHeader() + res.end() 가 합쳐져서 res.send() 가 된것이므로 위 send 두번이상 쓰는 건 의도치않은 에러를 발생합니다. 
// res.json() 또한
// res.writeHeader(200, {'Content-Type':application/json'});
// res.end(FJSON.stringify({hello:'hong'}));
// 위 둘이 합쳐져서 res.json({hello:'hong'});로 사용됩니다
// 역시 다른 메서들과 함께 두번이상 사용하지 않습니다

// Express 서버의 다른 서버와의 특징
// http  모듈의 웹서버의 확장판으로 코드의 가독성이 좋고 확장성이 좋습니다
// 프레임이 잡혀 있어 파일관리 및 운영이 용이합니다. 
// 비슷한 서버로서  Koa, Hapi  등이 있지만 Express 서버를 가장 많이 사용합니다.
// 코드관리 및 편의성에서 많은 장점을 제공합니다

// package.json
// Express  서버의 초기 설정 값들을 넣고 조절하는 파일입니다
// 직접 작성하여 파일을 생성하여되고,
// npm init 를 실행하여 생성하여도 무방합니다