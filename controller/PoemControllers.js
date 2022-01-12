const Poem = require('../models/PoemModels');
const apiBest = require('../utils/apiBest');
const apifeature = require('../utils/apiFeature');
const catchAsync = require('../utils/catchAsync');

exports.PostPoem=catchAsync(async(req,res,next)=>{
        req.body.IdWriter= req.user._id
 
        const poem= await Poem.create(req.body);
    
        res.status(200).json({
            status:'succes',
            data:{poem}
        })
});

exports.GetPoems=catchAsync(async(req,res,next)=>{
        const length=(await Poem.find()).length;
        const poem = new apifeature(Poem.find(), req.query).paginate().fields().sort().myPoet();
        const poemdt=await poem.data;
            
        
        res.status(200).json({
            status:'succes',
            data:poemdt,
            length:length
        })
});

exports.GetPoem=catchAsync(async(req,res,next)=>{
        const id= req.params.id
        const poem= await Poem.findById(id);
        res.status(200).json({
            status:'succes',
            data:poem
        })
});

exports.DeletePoem=catchAsync(async(req,res,next)=>{
    const id= req.params.id;
   
    const poem= await Poem.findByIdAndDelete(id);
    res.status(200).json({
        status:'succes',
        data:poem
    })
});


exports.BestPoem=catchAsync(async(req,res,next)=>{
    
        const poem = new apiBest(Poem.find(), req.query).Quintity().ratings();
        const poemdt=await poem.data;
            
        
        res.status(200).json({
            status:'succes',
            data:poemdt
        })
})
