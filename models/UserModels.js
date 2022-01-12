const mongoose=require('mongoose');
const validator=require('validator');
const bycript= require('bcryptjs');


const UserSchema= mongoose.Schema({
        LastName:{
            required:[true,'نام فامیل را وارد کنید'],
            type:String,
            max:[20,' تعداد کاراکتر های نام فامیل شما زیاد است '],
            min:[3,' تعداد کاراکتر های نام فامیل شما کم است ']
        },
        FristName:{
            required:[true,'اسم کوچک خود را وارد کنید'],
            type:String,
            max:[20,'تعداد کاراکتر های نام  شما زیاد است '],
            min:[3,'تعداد کاراکتر های نام  شما کم است']
        },
        Email:{
            unique:true,
            required:[true,' ایمیل خود را وارد کنید'],
            type:String,
            max:[20,' تعداد کاراکتر های نام ایمیل شما زیاد است '],
            min:[3,' تعداد کاراکتر های نام ایمیل شما کم است '],
            validate:[validator.isEmail]
        },
        Password:{
            required:[true,' رمز خود را وارد کنید'],
            type:String,
            max:[20,' تعداد کاراکتر های نام رمز شما زیاد است '],
            min:[3,' تعداد کاراکتر های نام رمز شما کم است '],
            select:false
        },
        PasswordConfirm:{
            required:[true,'تایید رمز خود را وارد کنید '],
            type:String,
            validate:{
                validator: function(el) {
                    return el === this.Password;
                  },
                  message: 'رمز ها متفاوت هستند!'
            }
        }

});

UserSchema.pre('save',async function(next){
     if(!this.isModified('Password')) return next();

    this.Password=await bycript.hash(this.Password, 12);
   
    this.PasswordConfirm= undefined;
    next();
})

UserSchema.methods.compirePassword= async function(password, psw){
     return await bycript.compare(password,psw);
}

const User= mongoose.model('User', UserSchema);

module.exports=User;