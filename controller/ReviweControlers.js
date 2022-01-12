
const Review= require('../models/ReviweModels');
const catchAsync = require('../utils/catchAsync');

exports.postMessage=catchAsync(async(req,res,next)=>{
        req.body.UserId= `${req.user._id}`
     
        const message= await Review.create(req.body);
    

        res.status(200).json({
            status:'succes',
            data:message
        })
});

exports.getMessage=catchAsync(async(req,res,next)=>{
        const id= req.params.id;

    const message= await Review.find({PoemId:id}).populate({
        path:'UserId',
        select:'FristName LastName _id'
    });
  
    res.status(200).json({
        status:'succes',
        data:message
    })
});

exports.deleteMessage=catchAsync(async(req,res,next)=>{
    const id= req.params.id;
    const message= await Review.findByIdAndDelete(id);

    res.status(200).json({
        status:'succes',
        data:message
    })
});