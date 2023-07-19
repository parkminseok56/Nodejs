// 05_Server05.js
const http=require('http');
const fs = require('fs').promises;

let users = { };

http.createServer( 
    // 함수 안에 await 형태의 함수가 호출되려면, 그를 포함한 함수는 async 키워드를 써서 작성함.
    async(req,res)=>{
    // (req,res)=>{} : 서버가 시작되면서 실행될 내용을 담는 함수      
        try{   // fs.readFile 함수가 await로 실행되면 then, catch를 쓰지 않으므로,
               //파일 입출력 당시 오류를 try~catch로 처리함.
            // console.log(req.url);
            // 요청된 method를 먼저 구분하고, 그 다음 url로 해당 요청에 대해 처리함.

            if(req.method === 'GET'){          // 조회 기능에 많이 사용됨. 
                if( req.url === '/')  {     
                    const data = await fs.readFile('./05_Front.html');
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    return res.end(data);
                }else if(req.url ==='/about'){
                    const data = await fs.readFile('./05_about.html');
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    return res.end(data);
                }else if( req.url ==='/users'){                   
                    res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
                    // users 객체에 있는 값들을 클라이언트에 안정하게 전송
                    return res.end(JSON.stringify(users));
                }


            }else if(req.method === 'POST'){          // 중요정보 입력      

                if( req.url ==='/user'){
                    req.on('data', (data)=>{// {'name' : '홍길동'}
                    let body = '';
                    // console.log('data:', data.toString());
                    body += data; // 비어있는 글자를 이어붙이기 해서 toString()없이 문자로 변환
                    // console.log('문자로 변환한 data : ', body);
                    const {name} = JSON.parse(body); // 전달된 데이터의 값을 꺼내서 name 변수에 저장
                    const id = Date.now(); // id 변수에 날짜를 추출(날짜 현재 시간을 밀리초로) 
                    users[id] = name; // 키값은 id, 벨류값은 name으로 객체에 저장
                    // console.log(users);
            });
                    return res.end('ok');                  
            }
            }else if(req.method === 'PUT'){           // 특정 자료를 insert, update 할 떄
                if( req.url.startsWith('/user/')){
                    let body = '';
                    // PUT 으로 전송된 url  '/user/41560148569'
                   let urlarr = req.url.split('/');
                   // '' / 'user' / '41560148569'
                   const key = urlarr[2];
                   req.on('data',(data) =>{
                        body += data;
                        const user = JSON.parse(body);
                        users[key] = user.name; // users 객체의 key 값의 항목을 전송된 name으로 수정 
                   });
                   res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                   return res.end('ok');
                }




            }else if(req.method === 'DELETE'){        // delete
                if( req.url.startsWith('/user/')){  
                   // '' 'user' '41560148569'              
                   let urlarr = req.url.split('/'); // '' 'user' '41560148569'
                   const key = urlarr[2];
                   delete users[key];
                   res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                   return res.end('ok');
                }
            }
            // 위의 각 if의 경우의 수에 req.url 이 없을 떄, 아래가 실행됨.
            res.writeHead(404);
            return res.end('<h1>NOT FOUND</h1>');
        }catch(에러){
                console.error(에러);
                res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                res.end(에러.message);
        }
       
}
    // 05_Front.html 이 첫 화면으로 보이게 코딩하시오
).listen(3002, ()=>{console.log('3002포트에서 서버 대기중이므니다.');} );;