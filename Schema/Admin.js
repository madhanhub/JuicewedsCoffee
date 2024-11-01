const mongoose=require('mongoose')
const admin=new mongoose.Schema({
        a_name:{type:String},
        a_password:{type:String}
})
module.exports=mongoose.model('Admin',admin)