import { catchError } from "../middleware/catchError.js"
import { ApiFeatures } from "./apiFeatures.js"
export const getAll =(model)=>{
return catchError(async (req,res,next)=>{
    let apiFeatures = new ApiFeatures(model.find(),req.query).paginate().filter().sort().fields().search()
    let documents = await apiFeatures.mongooseQuery
    let pageNumber = apiFeatures.pageNumber
    res.json({message:"all documents",pageNumber,limit:5,documents})
})
}