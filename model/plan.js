const mongoose = require('mongoose')



const planSchema = new mongoose.Schema({

    email:{
        type : String,
    },
 
   
    balince:{
        type:Number,
    },
    address:{
        type:String,
    },

   
    created :{
        type : Date,
        default:()=> Date.now(),
    },
    static :{
        type : String,
        default:'Pending',
    }


})

module.exports = mongoose.model(('plan'),planSchema)