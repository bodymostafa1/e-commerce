import { catchError } from "../middleware/catchError.js"

export const getOne = (model)=>{ 
    return catchError(async (req,res,next)=>{
    let document = await model.findById(req.params.id)
    document || next(new AppErorr("document not found",404))
    !document || res.json({message:" successful",document})
})}