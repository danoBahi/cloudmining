const express = require('express')
const router = express.Router();
const users = require('../model/users')
var bcrypt = require('bcryptjs')
const passport = require('passport');
const { route } = require('./userRout');
require('./passPortLocal')(passport)

router.get('/',(req,res)=>{
    res.render('index')
});




router.get('/signup',(req,res)=>{
    res.render('signup',{ csrfToken: req.csrfToken()})
});
router.get('/login',(req,res)=>{
    res.render('login',{ csrfToken: req.csrfToken()})
})


router.post('/signup',async (req,res)=>{
    const {first_name,last_name, username ,email, password,confromPassword} = req.body;
    if (!first_name || !last_name || !email || !username || !password || !confromPassword){
        res.render('signup',{ csrfToken: req.csrfToken(),err : "All Feld required!"})
    }
    else if(password != confromPassword){
        res.render('signup',{ csrfToken: req.csrfToken(),err : "Password Not Match !"})
    }
    else{ 
       var userdata = await users.findOne({ $or : [{email : email},{username : username}]})
       if(userdata){
        res.render('signup',{ csrfToken: req.csrfToken(),err : "User Exists , try again !"})
       }else{

        var salt = await bcrypt.genSalt(12)
        var hash = await bcrypt.hash(password,salt)

       await users({
            first_name : first_name,
            last_name : last_name,
            username : username,
            email : email,
            password : hash
        }).save()

        res.redirect('/login')
       }


    }

})

router.post('/login',(req,res,next)=>{

    passport.authenticate('local',{
        failureRedirect : '/login',
        successRedirect : '/user/',
        failureFlash : true,
    })(req,res,next)
})



router.use('/user',require('./userRout'));

module.exports = router