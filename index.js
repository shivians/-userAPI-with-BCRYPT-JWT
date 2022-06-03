require("dotenv").config()
const express =require("express")
const app=express()
const cors=require("cors")
const cookie=require("cookie-parser")
const logger=require("morgan")
const PORT=process.env.PORT || 4000
const userRouter=require("./routes/userRoutes")
const categoryRouter=require("./routes/categoryRoute")
const productRouter=require("./routes/productRoute")
const cartRouter=require("./routes/cartRoutes")
const orderRouter=require("./routes/orderRoutes")


//mongoose
require("./config/db")


//middlewares
app.use(cors())
app.use(cookie())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use("/api",userRouter)
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)


app.listen(PORT,(req,res)=>{
    console.log(`server is running on ${PORT}`)
})