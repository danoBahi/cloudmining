const mongoose = require('mongoose')



const perchezSchema = new mongoose.Schema({

    email:{
        type : String,
    },

   
    created :{
        type : Date,
        default:()=> Date.now(),
    },
    pname :{
        type : String,
    }


})

module.exports = mongoose.model(('perchez'),perchezSchema)