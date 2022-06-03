const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[{
      productId:{type:String},
      quantity:{
          type:String,
          default:1
      }
    }],
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, default:"pending"},

},
{timeseries:true});
const ORDER=mongoose.model("ORDER",orderSchema)
module.exports=ORDER