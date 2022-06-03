const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("mongoose is connected")
}).catch((error)=>{
    console.log("mongoose is not connected")
})