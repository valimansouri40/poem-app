const Rate= require('../models/RateModels');
const catchAsync = require('../utils/catchAsync');

exports.postRate=catchAsync(async(req,res,next)=>{

        req.body.UserId= req.user._id;
        req.body.PoemId= req.params.id;
       
        const rate=await Rate.create(req.body);

        res.status(200).json({
            status:'succes',
            data:rate
        })

})