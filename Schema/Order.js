const mongoose=require('mongoose')
const order=new mongoose.Schema({
    p_id:{type:String},
    u_id:{type:String},
    
    juice_name:{type:String},
    juice_price:{type:Number},
    juice_quantity:{type:Number},
    juice_amount:{type:Number},

    coffee_quantity:{type:Number},
    coffee_name:{type:String},
    coffee_price:{type:Number},
    coffee_amount:{type:Number},

    order_amount:{type:Number},
    order_date:{type:Date,default:Date.now},
    
})
module.exports=mongoose.model('Order',order)