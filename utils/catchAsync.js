module.exports=(dt)=>{
    return (req,res,next)=>{
        dt(req,res,next).catch(next)
    }
}