import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../database/models/brand.model.js"
let addBrand = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let brand = new Brand(req.body)
    await brand.save()
    res.json({message:"Brand added successfully",newBrand:brand})
})
let allBrands = catchError(async (req,res,next)=>{
    let brands = await Brand.find()
    res.json({message:"all categories",brands})
})
let getBrand = catchError(async (req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppErorr("Brand not found",404))
    !brand || res.json({message:"found brand",brand})
})
let updateBrand = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let brand = await Brand.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    brand || next(new AppErorr("Brand not found",404))
    !brand || res.json({message:"updated successfully",brand})
})
let deleteBrand = catchError(async (req,res,next)=>{
    let brand = await Brand.findByIdAndDelete(req.params.id)
    brand || next(new AppErorr("Brand not found",404))
    !brand || res.json({message:"deleted successfully"})
})
export{
    addBrand,
    allBrands,
    getBrand,
    updateBrand,
    deleteBrand
}