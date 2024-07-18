let mode = "prod"
export const globalError = (err,req,res,next)=>{
    let code = err.statusCode || 500
    if (mode = "prod") {
        res.status(code).json({message:"error",err:err.message,statusCode:err.statusCode,stack:err.stack})
    } else {
        res.status(code).json({message:"error",err:err.message,statusCode:err.statusCode})
    }
}