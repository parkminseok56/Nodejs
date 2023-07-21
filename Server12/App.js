const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.set('port', process.env.PORT || 3000); 
app.set('view engine','html');
nunjucks.configure('views',{express:app, watch: true,});


app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});