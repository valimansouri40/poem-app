const express=require('express');
const cookieParser=require('cookie-parser');
const hpp= require('hpp');
const limit=require('express-rate-limit');
const xss= require('xss-clean');
const helmet= require('helmet');
const cors=require('cors');

const poemRoutes=require('./routes/PoemRoutes');
const userRoutes=require('./routes/UserRoutes');
const reviweRoutes= require('./routes/ReviweRoutes');
const rateRoutes= require('./routes/RateRoutes')
const appError= require('./utils/appError');
const globalhandller=require('./controller/errorControlers');


const app= express();
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

const limits= limit({
    max:100,
    windowMs: 60* 60 * 1000,
    message: 'send more than request in poem app'
})

app.use('/api',limits);
app.use(hpp());
app.use(xss());
app.use(helmet());

app.use((req,res,next)=>{
    console.log('middaleware');
    next();
})
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
 }
 
 app.use(cors(corsOptions))
 
app.use('/api/v1/poem',poemRoutes);
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/reviwe', reviweRoutes);
app.use('/api/v1/rate', rateRoutes);

app.all('*',(req,res,next)=>{
        next( appError(`erro ${req.originalUrl}`),404)
})

app.use(globalhandller);

module.exports=app;