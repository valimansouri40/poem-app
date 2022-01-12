const mongoose=require('mongoose');
const dotenv= require('dotenv');

const app=require('./app');

dotenv.config({path:'./config.env'});

mongoose.connect(process.env.LOCAL_DATABASE,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('mongoose connect')).catch(er=>console.log(er));

const port= process.env.PORT || 8000;

app.listen(port,()=>{
    console.log('app running on port 8000')
})