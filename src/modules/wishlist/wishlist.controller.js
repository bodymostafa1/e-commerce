import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"


let addToWishlist = catchError(async (req,res,next)=>{
    let user = await User.findByIdAndUpdate(req.user._id , {$addToSet:{wishlist:req.body.product}} ,{new:true})
    user || next(new AppErorr("user not found",404))
    !user || res.json({message:"updated successfully",wishlist:user.wishlist})
})
let deleteFromWishlist = catchError(async (req,res,next)=>{
    let user = await User.findByIdAndUpdate(req.user._id, {$pull:{wishlist:req.params.id}} ,{new:true})
    user || next(new AppErorr("user not found",404))
    !user || res.json({message:"updated successfully",wishlist:user.wishlist})
}) 
let getUserWishlist = catchError(async (req,res,next)=>{
    let user = await User.findById(req.user._id).populate('wishlist')
    user || next(new AppErorr("user not found",404))
    !user || res.json({message:"updated successfully",wishlist:user.wishlist})
}) 
export{
    addToWishlist,
    deleteFromWishlist,
    getUserWishlist 
}