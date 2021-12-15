const express = require('express');
const app = express();
const router = require('./controller/routes')
const userrouter = require('./controller/userRout')
const mongoURl = require('./config/mongoKey')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const csruf = require('csurf')
const passport = require('passport')
const flash = require('connect-flash')
const plans = require('./model/plan')
const userData = require('./model/users')

// Db connection

mongoose.connect(mongoURl,(err)=>{
    console.log('database connected');
})


//server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is lising ${PORT}`)
})

// view engine 
    app.set('view engine','ejs')
    app.set('views',__dirname + '/views')

app.use(express.urlencoded({extended:true}))


// static
app.use(('/static'),express.static(__dirname + '/static'))

app.use(cookieParser("randomKey"))
app.use(expressSession({
    secret : "randomKey",
    resave : true,
    maxAge : 24 * 60 * 60 * 1000,
}))

app.use(csruf());

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req,res,next)=>{
    res.locals.error = req.flash('error')
    next()
})

// data seeing
// app.get('/all',async(req,res)=>{
//     // get all data
//     var d = await data.find({ username : 'dan' })
//     console.log(d);
//     res.send(d)

// })





    // routes
    app.use(router)

    app.use((req,res)=>{
        res.status(404).render('404')
    })

