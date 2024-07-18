import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Brand } from "../../../database/models/brand.model.js"
import { deleteImage } from "../../utils/deleteOldImage.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getAll } from "../../utils/getAll.js"
import { getOne } from "../../utils/getOne.js"
let addBrand = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()
    res.json({message:"Brand added successfully",newBrand:brand})
})
let allBrands = getAll(Brand)
let getBrand = getOne(Brand)
let updateBrand = catchError(async (req,res,next)=>{
    if(req.body.slug)req.body.slug = slugify(req.body.name)
        if(req.file) {
        req.body.logo = req.file.filename
        deleteImage(Brand,req,"logo")
    }
    let brand = await Brand.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    brand || next(new AppErorr("Brand not found",404))
    !brand || res.json({message:"updated successfully",brand})
})
let deleteBrand = deleteOne(Brand)
export{
    addBrand,
    allBrands,
    getBrand,
    updateBrand,
    deleteBrand
}