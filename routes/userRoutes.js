const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");
const validate = require("validator");


//routes
router.get("/read", async (req, res) => {
  try {
    const user = await User.find(req.body);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// user register

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    console.log(req.body);

    // Get user input

    const { name, email, password } = req.body;

    // Validate user input

    if(!(name && email && password )){
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.json({ message: "user already exist" });
    } 

    //password hash

    const passwordHash=await bcrypt.hash(password,12)

    //create user in database

    const newUser=new User({
        name:name,
        email:email,
        password:passwordHash,
        token:token
    })
    await newUser.save();


    //create token
    const token= await jwt.sign({time:Date()},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})

    //save user token
    User.token=token

   console.log(token)

   //return new user
   
    return res.json({message:"register successfully",data:newUser,token:token})
  } catch (error) {
    res.send(error);
  }

  // our register logic end here
});

//login user

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    console.log(req.body);

     // Get user input

    const { email, password } = req.body;

     // Validate user input

     if(!(email && password )){
      res.status(401).send("All input is required");
    }
     // Validate  find user in our database
     const user = await User.findOne({ email });
  
     if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      

      // save user token
      user.token = token;
      

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
       
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
  return
});

//update user

router.patch("/userUpdate/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateUser = await User.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      message: " Updated Successfully",
      data: updateUser,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

//delete user
router.delete("/deleteUser/:id",async(req,res)=>{
try {
  console.log(req.body)
  const _id=req.params.id
  const deleteUser=await User.findByIdAndDelete(_id)
  res.json({
    data:deleteUser,
    message:"delete successfully"
  })
} catch (error) {
  return res.status(400).json({ err: err.message });
}
})

//search api

router.get("/searchUser/:key",async(req,res)=>{
  try {
    const data= await User.find(
      {
        "$or":[
          {name:{$regex:req.params.key}}
        ]
      }
    );
    res.status(201).json({
      message:"result",
      data:data,
    })
   
    
  } catch (error) {
    res.send(error);
  }
})

router.get("/hello",auth,(req,res)=>{
  res.send("my name is shivam maurya")
  console.log("hello everybody")
})

module.exports = router;
