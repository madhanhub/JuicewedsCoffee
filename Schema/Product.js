const mongoose=require('mongoose')
const product=new mongoose.Schema({
        juice_name:{type:String},
        juice_price:{type:Number},
        coffee_name:{type:String},
        coffee_price:{type:Number}
})
module.exports=mongoose.model('Product',product)