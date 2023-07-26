const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.set('port', process.env.PORT || 3000); 



app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
