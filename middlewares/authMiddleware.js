
const jwt=require('jsonwebtoken')
const User=require('../models/userSchema')
const isAuth=async(req,res,next)=>{

    if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')){
       //401 unauthorized
        return res.status(401).json({msg:'No token, authorization denied'})
    }
    
    const token=req.headers.authorization.split(' ')[1]
    if(!token){

        return res.status(401).json({msg:'No token, authorization denied'})
    }
    try{
        const decoded=jwt.verify(token,process.env.TOKEN_SECRET)
        const user=await User.findById(decoded.id)
        if(!user){

            return res.status(401).json({msg:'Token is not valid'})
        }
        req.user={
            id:user._id,
            name:user.name,
            email:user.email
        }
       
        next()
    }

    catch(err){

        return res.status(401).json({msg:'Token is not valid'})
    }


}



module.exports=isAuth;