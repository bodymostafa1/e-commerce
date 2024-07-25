import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteImage } from "../../utils/deleteOldImage.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getAll } from "../../utils/getAll.js"
import { getOne } from "../../utils/getOne.js"
let addCategory = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.json({message:"category added successfully",newCategory:category})
})
let allCategories = getAll(Category)
let getCategory = getOne(Category)
let updateCategory = catchError(async (req,res,next)=>{
    if(req.body.slug)req.body.slug = slugify(req.body.name)
        if(req.file) {
        req.body.image = req.file.filename
        deleteImage(Category,req,"image")
    }
    let category = await Category.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    category || next(new AppErorr("category not found",404))
    !category || res.json({message:"updated successfully",category})
})
let deleteCategory =deleteOne(Category)
export{
    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory
}