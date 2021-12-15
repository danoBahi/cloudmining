const express = require('express')
const plans = require('../model/plan')
const userData = require('../model/users')
const perchez = require('../model/perchez')
const wid = require('../model/wid')
const router = express.Router();
const bcryptjs = require('bcryptjs');
var moment = require('moment')
const mongoose = require('mongoose')


function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        res.set(
        "Cache-Control",
        "no-cache,private,no-store,must-revalidate,post-check=0,pre-check=0"
        )
        next()
    }else{

        res.redirect('/login')
        
    }
}

router.get('/',checkAuth,(req,res)=>{
    
    userData.findOne({ email : req.user.email },(err,data)=>{
        if (err)throw err
        if (data){
            console.log(data.aBalince);
            res.render('user',{data: data})
        }
    })
})

router.post('/add',checkAuth, (req,res)=>{

        const { balince  ,address} = req.body;
        plans({
            email :req.user.email,
            balince : balince,
            address : address,
        }).save((err,data)=>{
            res.redirect('/user/histry')
        })
})
router.post('/wid',checkAuth, (req,res,next)=>{

        const { balince  ,address} = req.body;

        if (balince >= 50){
            console.log('kkk');
            wid({
                email :req.user.email,
                address : address,
                balince : balince,
                
            }).save((err,data)=>{
                res.redirect('/user/histry')
            })
        }else{
            var er = "Sorry your baline is Lessthen 50 Trx"
        }
})


router.get('/plan',checkAuth,(req,res)=>{
    userData.findOne({ email : req.user.email },(err,data)=>{
        if (err)throw err
        if (data){
            res.render('plan',{ csrfToken: req.csrfToken(), data: data})
        }
    })
});

router.post ('/bplan', async (req,res)=>{
    
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { pBlaince : -20 }})
    userData.findOne({ email : req.user.email },(err,data)=>{
        if (err)throw err
        if (data){
            const { balince  ,address} = req.body;
            perchez({
            email :req.user.email,
            pname : "Basic",
        }).save()
        
            res.render('plan',{ csrfToken: req.csrfToken(), data: data})
        }
    })
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { dBlaince : +1 }})
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { ghs : +250 }})
    
 })
router.post ('/nplan', async (req,res)=>{
    
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { pBlaince : -50 }})
    userData.findOne({ email : req.user.email },(err,data)=>{
        if (err)throw err
        if (data){
            const { balince  ,address} = req.body;
            perchez({
            email :req.user.email,
            pname : "Basic",
        }).save()
        
            res.render('plan',{ csrfToken: req.csrfToken(), data: data})
        }
    })
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { dBlaince : +3.5 }})
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { ghs : +510 }})
    })

router.post ('/pplan', async (req,res)=>{
    
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { pBlaince : -100 }})
    userData.findOne({ email : req.user.email },(err,data)=>{
        if (err)throw err
        if (data){
            const { balince  ,address} = req.body;
            perchez({
            email :req.user.email,
            pname : "Basic",
        }).save()
        
            res.render('plan',{ csrfToken: req.csrfToken(), data: data})
        }
    })
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { dBlaince : +7 }})
    await userData.findOneAndUpdate({email : req.user.email},{ $inc : { ghs : +1050 }})
   
 })

router.get('/withdrawal',checkAuth,(req,res)=>{
    userData.findOne({ email : req.user.email },(err,data)=>{
        if (err)throw err
        if (data){
            res.render('withdrawal',{data: data,csrfToken : req.csrfToken() })
        }
    })
});

router.get('/contact',checkAuth,(req,res)=>{
    res.render('contact')
});
router.get('/deposit',checkAuth,(req,res)=>{
    res.render('deposit', { csrfToken : req.csrfToken() })
});
router.get('/histry',checkAuth,(req,res)=>{
    // plans.findOne({ email : req.user.email , moment:moment},(err,data)=>{
    //     if (err)throw err
    //     if (data){
    //         res.render('histry',{data:data, moment:moment})
    //     }
    // })
    wid.findOne({ email : req.user.email , moment:moment},(err,data)=>{
        if (err)throw err
        if (data){
            res.render('histry',{data:data, moment:moment})
        }
    })
});



router.get('/logout',(req,res)=>{
    req.logOut();
    req.session.destroy((err)=>{
        res.redirect('/')
    })
})


module.exports = router