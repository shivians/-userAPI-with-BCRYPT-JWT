
const express=require("express");
const router=express.Router()
const Product=require("../models/product");
const User = require("../models/user");

//createProduct

router.post("/product",async(req,res)=>{
try {
    console.log(req.body)
    const product=new Product(req.body)
    const newproduct=await product.save()
    res.json({
        message:"workinng successfully",
        data:newproduct
    })
} catch (error) {
   res.json({error:error}) 
}
})

//read product

router.get("/findProducts",async(req,res)=>{
try {
    console.log(req.body)
    const product=await  Product.find(req.body)
    res.json({
        message:"all products",
        data:product
    })
    
} catch (error) {
    res.json({error:error})   
}
})


//update product
router.patch('/updateProduct/:id',async(req,res)=>{
    try {
        console.log(req.body)
        const _id = req.params.id
        const user=req.body
        const updatePro = await User.findByIdAndUpdate(_id,{name:user.name})
        res.json({data:updatePro,
        message:"updated successfully"})

    } catch (error) {
        res.json({error:error})   
    }
})

//delete product

module.exports=router