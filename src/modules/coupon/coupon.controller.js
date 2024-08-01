import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getAll } from "../../utils/getAll.js"
import { getOne } from "../../utils/getOne.js"
import { Coupon } from "../../../database/models/coupon.model.js"
let addCoupon = catchError(async (req,res,next)=>{
    let isExist = await Coupon.findOne({code:req.body.code})
    if(isExist) return next(new AppErorr("coupon already exists",409))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.json({message:"Coupon added successfully",newCoupon:coupon})
})
let allCoupons = getAll(Coupon)
let getCoupon = getOne(Coupon)
let updateCoupon = catchError(async (req,res,next)=>{
    let coupon = await Coupon.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    coupon || next(new AppErorr("Coupon not found",404))
    !coupon || res.json({message:"updated successfully",coupon})
})
let deleteCoupon = deleteOne(Coupon)
export{
    addCoupon,
    allCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}