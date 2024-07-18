import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getOne } from "../../utils/getOne.js"
let addSubCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({message:"subCategory added successfully",newSubCategory:subCategory})
})
let allSubCategories = catchError(async (req,res,next)=>{
    let filterObject = {}
    if(req.params.category) filterObject.category = req.params.category
    let categories = await SubCategory.find(filterObject)
    res.json({message:"all subcategories",categories})
})
let getSubCategory = getOne(SubCategory)
let updateSubCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    subCategory || next(new AppErorr("SubCategory not found",404))
    !subCategory || res.json({message:"updated successfully",subCategory})
})
let deleteSubCategory = deleteOne(SubCategory)
export{
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}