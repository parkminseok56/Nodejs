const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.post('/insert',async(req,res)=>{
        try{
            const comment =  Comment.create(
                {
                    Commenter:req.body.id,
                    comment:req.body.comment,
                }
            );
            // res.json(comment);
            res.send('ok');
        }catch(err){
            console.log(err);
            next(err);
        }
});

router.get('/', async(req,res,next)=>{
    try{
        Comment,User.findAll({
            include:{
                model:User,
            }
        });
        res.json( comments)
    }catch(err){
        console.error(err);
        next(err);
    }
});




module.exports = router;