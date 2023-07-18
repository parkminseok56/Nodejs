// 05_Server05.js
const http=require('http');
const fs = require('fs').promises;

http.createServer( 
    async(req,res)=>{
    // (req,res)=>{} : 서버가 시작되면서 실행될 내용을 담는 함수      
        try{   
            // console.log(req.url);
            if(req.method === 'GET'){          // 조회 기능에 많이 사용됨. 
                if( req.url === '/')  {     
                    const data = await fs.readFile('./05_Front.html');
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    res.end(data);
                }else if(req.url ==='/about'){
                    const data = await fs.readFile('./05_about.html');
                    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                    return res.end(data);
                }
            }else if(req.method === 'POST'){          // 중요정보 입력
            
            }else if(req.method === 'PUT'){           // insert, update

            }else if(req.method === 'DELETE'){        // delete


            }else{


            }
        }catch(에러){
                console.error(에러);
                res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
                res.end(에러.message);
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
}
    // 05_Front.html 이 첫 화면으로 보이게 코딩하시오
).listen(3002, ()=>{console.log('3002포트에서 서버 대기중이므니다.');} );;