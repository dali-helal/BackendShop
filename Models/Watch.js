const mongoose =require('mongoose')

const watchSchema=new mongoose.Schema({
    title :String , 
    color : String , 
    marque :String , 
    price  : Number , 
    picture : String ,
    gender :String ,
    quantity:Number,
}, { timestamps: true })

const Watch =mongoose.model('Watch',watchSchema)
module.exports= Watch