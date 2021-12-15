const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

    first_name:{
        type : String,
        
        
    },
    last_name:{
        type : String,
        
    },
    username:{
        type : String,
    },

    email:{
        type : String,
    },
    password:{
        type : String,
    },
   
    aBlaince:{
        type:Number,
        default:0
    },
    pBlaince:{
        type:Number,
        default:20
    },
    wBlaince:{
        type:Number,
        default:0
    },
    dBlaince:{
        type:Number,
        default:0
    },
    ghs:{
        type:Number,
        default:0
    },
    created :{
        type : Date,
        require:true,
        default:()=> Date.now(),
    }


})

module.exports = mongoose.model(('userdata'),userSchema)