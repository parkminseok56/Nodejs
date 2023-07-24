const express = require('express')
const router = express.Router();

router.get('/', (req,res)=>{
    const loginUser = req.session.loginUser;
    res.render('main',{loginUser});
});


module.exports = router;