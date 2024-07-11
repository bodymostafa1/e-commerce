import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
let addCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category = new Category(req.body)
    await category.save()
    res.json({message:"category added successfully",newCategory:category})
})
let allCategories = catchError(async (req,res,next)=>{
    let categories = await Category.find()
    res.json({message:"all categories",categories})
})
let getCategory = catchError(async (req,res,next)=>{
    let category = await Category.findById(req.params.id)
    category || next(new AppErorr("category not found",404))
    !category || res.json({message:"deleted successfully"})
})
let updateCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category = await Category.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    category || next(new AppErorr("category not found",404))
    !category || res.json({message:"deleted successfully"})
})
let deleteCategory = catchError(async (req,res,next)=>{
    let category = await Category.findByIdAndDelete(req.params.id)
    category || next(new AppErorr("category not found",404))
    !category || res.json({message:"deleted successfully"})
})
export{
    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory
}