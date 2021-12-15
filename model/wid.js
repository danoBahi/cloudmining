const mongoose = require('mongoose')



const widSchema = new mongoose.Schema({

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

module.exports = mongoose.model(('wid'),widSchema)