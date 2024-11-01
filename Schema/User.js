const mongoose=require('mongoose')
const user=new mongoose.Schema({
    user_name:{type:String},
    user_mail:{type:String},
    user_phone:{type:Number},
    user_password:{type:String}

})
module.exports=mongoose.model('User',user)