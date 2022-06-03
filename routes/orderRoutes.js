const express =require("express");
const router=express.Router();
const ORDER=require("../models/orderModel")

//create order
router.post("/createOrder",async(req,res)=>{
    try {
        console.log(req.body);
        const order=new ORDER(req.body);
        const newOrder=await order.save()
        res.status(200).json({
         message:"create order successully",
         data:newOrder
    })
        
    } catch (error) {
        res.send(error)
        
    }
});

module.exports=router