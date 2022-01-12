const mongoose=require('mongoose');
const validator=require('validator');


const ReviweSchema= mongoose.Schema({
    Message:{
        required:[true,''],
        type:String,
        validate:{
            validator:function(val){
                return val !== ''},
                message: 'message not empety'
            
           
        }},
     PoemId:{
        required:[true,''],
        type:mongoose.Schema.ObjectId,
        ref:'Poem'
    },
    UserId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
    
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


const Reviwe= mongoose.model('Reviwe', ReviweSchema);

module.exports=Reviwe;