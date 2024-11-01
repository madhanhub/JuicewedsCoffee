const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyparser=require('body-parser')

app.use(express.json())
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))

const admin=require('./Schema/Admin')
const user=require('./Schema/User')
const product=require('./Schema/Product')
const order=require('./Schema/Order')

app.listen(8080,()=>{
    console.log('server run');

    mongoose.connect('mongodb://localhost:27017/jusice')
    .then(()=>{
        conn=mongoose.connection
        console.log('DB Connect');
    })
    .catch((error)=>{
        console.log('DB Error',error);
    })
})

app.get('/',async(req,res)=>{
    res.send('welcom')
})

app.post('/Admin',async(req,res)=>{
    try{const {a_name,a_password}=req.body
    const New_admin=new admin({
            a_name,a_password
    }).save()
    res.status(200).json({message:'success',data:New_admin})
}catch(error){
    res.status(500).json({message:'failed'})
}
})

app.delete('/Admin/delete',async(req,res)=>{
    try{
        const Admin_delete=await admin.findOneAndDelete({_id:req.body._id})
        res.status(200).json({message:'success',data:Admin_delete})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.get('/Admin/view',async(req,res)=>{
    try{
        const User_view=await user.find({})
        res.status(200).json({message:'success',data:User_view})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/User',async(req,res)=>{
    try{
        const {user_name,user_mail,user_phone,user_password}=req.body
        const New_user=new user({
            user_name,user_mail,user_phone,user_password
        }).save()
        res.status(200).json({message:'success',data:New_user})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.delete('/User/delete',async(req,res)=>{
    try{
        const User_delete=await user.findOneAndDelete({_id:req.body._id})
        res.status(200).json({message:'true',data:User_delete})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/login',async(req,res)=>{
    try{
        const {role,user_name,user_password,a_name,a_password}=req.body
        let login
        if(role==='admin'){
            login=await admin.findOne({a_name,a_password})
        }else if(role === 'user'){
            login=await user.findOne({user_name,user_password})
        }else{
            return res.status(400).json({message:'Invalid '})
        }
        if(login){
            res.status(200).json({message:'Login',data:login})
        }
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/Product',async(req,res)=>{
    try{
        const {juice_name,juice_price,coffee_name,coffee_price}=req.body
        const new_product=new product({
            juice_name,juice_price,coffee_name,coffee_price
        }).save()
        res.status(200).json({message:'success',data:new_product})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.put('/Product/update',async(req,res)=>{
    try{
        const{juice_name,juice_price,coffee_name,coffee_price}=req.body
        const p_update=await product.findOneAndUpdate({_id:req.body._id},
            {$set:{
                juice_name,juice_price,coffee_name,coffee_price
            }})
            res.status(200).json({message:'success',data:p_update})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.get('/Product/List',async(req,res)=>{
    try{
        const p_view=await product.find({})
        res.status(200).json({message:'success',data:p_view})
    }catch(erro){
        res.status(500).json({message:'failed'})
    }
})

app.delete('/Product/delete',async(req,res)=>{
    try{
        const p_delete=await product.findOneAndDelete({_id:req.body._id})
        res.status(200).json({message:'success',data:p_delete})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

app.post('/Order',async(req,res)=>{
    try{
        const{p_id,u_id,juice_name,juice_price,juice_quantity,coffee_name,coffee_price,coffee_quantity,order_date}=req.body
        const juice_amount=juice_price * juice_quantity
        const coffee_amount=coffee_price * coffee_quantity
        const order_amount=juice_amount + coffee_amount
        const New_order=new order({
            p_id,u_id,juice_name,juice_price,coffee_name,coffee_price,order_amount,order_date,juice_amount,coffee_amount,
            juice_quantity,coffee_quantity
        }).save()
        res.status(200).json({message:'success',data:New_order})
    }catch(error){
        res.status(500).json({message:'failed'})
    }
})

