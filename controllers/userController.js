
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOne } = require('../models/userSchema');
const userController={

    register:async(req,res)=>{

        const {name,email,password}=req.body;

        if(!name||!email||!password){

            return res.status(400).json({msg:'Please enter all fields'})

        }
        const user=await User.findOne({email})

        if(user){

            return res.status(400).json({msg:'User already exists'})


        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        
        if(!newUser){

            return res.status(400).json({msg:'User not created'})

        }
        res.status(200).json({"_id":newUser._id,"name":newUser.name,"email":newUser.email,token:generateToken(newUser._id)})


    },
    login:async(req,res)=>{

        const {email,password}=req.body;

        if(!email||!password){

            return res.status(400).json({msg:'Please enter all fields'})

        }
        const user=await User.findOne({email})
        if(!user){

            return res.status(400).json({msg:'email does not exist'})

        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){

            return res.status(400).json({msg:'password is incorrect'})

        }
      
        res.status(200).json(
            {
                "_id":user._id,
                "name":user.name,
                "email":user.email,
                token:generateToken(user._id)
            }
        )

    },
    me:async(req,res)=>{
        res.status(200).json(req.user)
    }
}
const generateToken=(id)=>{

    return  jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn:'10d'})

}
module.exports=userController;