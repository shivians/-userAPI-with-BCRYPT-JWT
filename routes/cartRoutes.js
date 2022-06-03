const express =require("express");
const router=express.Router();
const CART=require("../models/cartModel")

//routes
router.post("/createCart",async(req,res)=>{
    try {
        const cart=new CART(req.body);
        const newCart=await cart.save();
        res.status(201).json({message:"create cart successfully",data:newCart})
    } catch (error) {
        res.send({error:error})
    }
})
module.exports=router