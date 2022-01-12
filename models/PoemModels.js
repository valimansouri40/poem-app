const mongoose=require('mongoose');


const PoemShema= mongoose.Schema({
    Poem: {
        required:[true,'شعر را وارد نکردید'],
        type:Object
    },
    PoemName: {
        required:[true,'شعر را وارد نکردید'],
        type:String
    },
    Poet:{
        required:[true,"نام شاعر را وارد نکردید"],
        type:String,
        max:[25,'تعداد کاراکتر ها زیاد است'],
        min:[3,'تعداد کاراکتر ها کم است']
    },
    photo:{
        type:Object
    },
    CreateAt:{
        type:Date,
        default: Date.now()
    },
    rating:{
        type:Number,
        default:4.5,
        max:5,
        min:1,
        // set: val=> Math.round(val/10) * 10
    },
    Style:{
        required:[true,'سبک را بنویسید'],
        type:String,
        max:[25,'تعداد کاراکتر ها زیاد است'],
        min:[2,'تعداد کاراکتر ها کم است']
    },
    ratingQuntity:{
        type:Number,
        default:0
    },
    IdWriter:{
        type:mongoose.Schema.ObjectId,
        ref:"auth"
    }
});


const Poem= mongoose.model('Poem', PoemShema);

module.exports=Poem;
