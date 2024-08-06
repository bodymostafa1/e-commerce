import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { Product } from "../../../database/models/product.model.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getAll } from "../../utils/getAll.js"
import { getOne } from "../../utils/getOne.js"
let addProduct = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    if (req.body.imageCover) req.body.imageCover = req.files.imageCover[0].filename
     if (req.body.images) {
        req.body.images = req.files.images.map((img)=>{
            return img.filename
        })
     }
    let product = new Product(req.body)
    await product.save()
    res.json({message:"Product added successfully",newProduct:product})
})
let allProducts = getAll(Product)
let getProduct = getOne(Product)
let updateProduct = catchError(async (req,res,next)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map((img)=>{
        return img.filename
    })
    let product = await Product.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    product || next(new AppErorr("Product not found",404))
    !product || res.json({message:"deleted successfully"})
})
let deleteProduct = deleteOne(Product)
export{
    addProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct
}