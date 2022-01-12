const User=require('../models/UserModels');
const catchAsync = require('../utils/catchAsync');
const jwt= require('jsonwebtoken');
const {promisify} =require('util');
const AppError = require('../utils/appError');

const createToken=(id)=>{
     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})  
}

const createAndSendToken=async(user,statusCode,res)=>{

       const token= createToken(user._id);
        const cookieOption={
            expires:new Date( Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly:true
        }
        if(process.env.NODE_ENV === 'production') cookieOption.secure = true;

     res.cookie('poem',token, cookieOption );
      
        res.status(200).json({
            status:'succes',
            data: user,
            token: token
        })
}


exports.Sineup=catchAsync(async(req,res)=>{
        
        const user= await User.create(req.body);

        createAndSendToken(user,200,res);
});

exports.Login=catchAsync(async(req,res,next)=>{

        const {Password,Email}=req.body;
        if(!Password || !Email) return next();
      
        const user= await User.findOne({Email:Email}).select('+Password');
      

        if(!user || !(await user.compirePassword(user.Password, Password))){
            next()
        }
      
        const token= createToken(user._id);
        // const cookieOption={
        //     expires:new Date( Date.now() + 90 * 24 * 60 * 60 * 1000),
        //     httpOnly:true
        // }
        // if(process.env.NODE_ENV === 'production') cookieOption.secure = true;

        //res.cookie('poem',token, cookieOption );
       
        res.status(200).json({
            status:'success',
            data:user,
        })
});

exports.log=catchAsync(async(req,res,next)=>{

    const user= await User.findOne({Email: req.body.Email}).select('+Password');

    if(!user){
        next(new AppError('error',400))
    }

    const token=createToken(user._id);
 
   
        res.status(200).json({
            status:'succes',
            data:user,
            token:token
        })

})
exports.Protect=catchAsync(async (req, res ,next)=>{

    let token;
   
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }else if(req.cookies.poem){
        token = req.cookies.poem
      }

    if(!token){
        next(new AppError('error',400))
    }
 
    const corect=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    
    if(!corect){
        next(new AppError('error',400));
    }

    const user= await User.findById(corect.id);

    if(!user){
        next(new AppError('error',400));
    }
    
    req.user = user
    
    next();

});

exports.GetMe=catchAsync(async(req,res,next)=>{
        const user= req.user;

        res.status(200).json({
            status:'succes',
            data: user
        })
})
exports.Logout=catchAsync(async(req,res,next)=>{
    if(req.cookies.poem){

        res.cookie('poem','logout',{expires:new Date(Date.now() + 1 * 1000)})
    }
})