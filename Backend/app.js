require("dotenv").config()
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth.middleware");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
connectDB()

const jwtSecret = process.env.JWT_SECRET

app.use(express.json())
app.use(cookieParser())

app.get("/" , (req , res) =>{
    res.send('Hello World')
})




app.get("/profile" , authMiddleware ,(req,res) => {
    res.json({
        message:"protected route accessed",
        user:req.user,
    })
})

app.post('/login',async(req, res) => {
    let {beltNo , password} = req.body
    console.log(req.body)
    let userFound = await userModel.findOne({beltNo})
    if(!userFound){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    bcrypt.compare(password , userFound.password , (err,result ) => {
        console.log(result)
        console.log("hash password",password)
        console.log("user password",userFound.password)
        if(result){
            let token = jwt.sign({beltNo:userFound.beltNo } , jwtSecret)
            res.cookie("token", token);
            res.status(200).json({
                success:true,
                token,
                user:{
                    id:userFound._id,
                    beltNo:userFound.beltNo,
                    role:userFound.role,
                },
                
            });
        } else{
            res.status(400).json({
                success:false,
                message:"wrong password"
            })
        }
    })

    // if(userFound){
    //     return res.status(200).send("login successful")
    // }
})

app.listen(process.env.PORT || 5000,(req , res) =>{
    
    console.log(`server is running on port ${process.env.PORT || 5000}`)
})