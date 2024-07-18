import { catchError } from "../middleware/catchError.js"
import { paginate } from "./paginate.js"

export const getAll =(model)=>{
return catchError(async (req,res,next)=>{
    let {documents,pageNumber} = await paginate(req.query.page,5,model)
    res.json({message:"all documents",pageNumber,limit:5,documents})
})
}