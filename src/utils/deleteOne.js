import { catchError } from "../middleware/catchError.js"

export const deleteOne = (model)=>{
    return catchError(async (req,res,next)=>{
    let document = await model.findByIdAndDelete(req.params.id)
    document || next(new AppErorr("document not found",404))
    !document || res.json({message:"deleted successfully"})
})}