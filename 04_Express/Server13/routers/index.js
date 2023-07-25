const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{ 
    // nunjucks 엔진에 의한 render
    res.render('login', {});
});

module.exports = router;