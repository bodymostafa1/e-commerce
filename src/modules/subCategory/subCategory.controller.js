import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"

let addSubCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({message:"subCategory added successfully",newSubCategory:subCategory})
})
let allSubCategories = catchError(async (req,res,next)=>{
    let categories = await SubCategory.find()
    res.json({message:"all categories",categories})
})
let getSubCategory = catchError(async (req,res,next)=>{
    let subCategory = await SubCategory.findById(req.params.id)
    subCategory || next(new AppErorr("SubCategory not found",404))
    !subCategory || res.json({message:"found subCategory",subCategory})
})
let updateSubCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    subCategory || next(new AppErorr("SubCategory not found",404))
    !subCategory || res.json({message:"updated successfully",subCategory})
})
let deleteSubCategory = catchError(async (req,res,next)=>{
    let subCategory = await SubCategory.findByIdAndDelete(req.params.id)
    subCategory || next(new AppErorr("SubCategory not found",404))
    !subCategory || res.json({message:"deleted successfully"})
})
export{
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}