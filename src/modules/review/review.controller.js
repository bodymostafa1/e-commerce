import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteImage } from "../../utils/deleteOldImage.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getAll } from "../../utils/getAll.js"
import { getOne } from "../../utils/getOne.js"
import { Review } from "../../../database/models/review.model.js"
let addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id;
    let isExist = await Review.findOne({ user: req.user._id, product: req.body.product });
    if (isExist) return next(new AppErorr("You created a review before", 409));
    let review = new Review(req.body);
    await review.save();
    res.json({ message: "success", review });
})
let allReviews = getAll(Review)
let getReview = getOne(Review)
let updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id}, req.body, { new: true })
    review || next(new AppErorr("Review not found or you have not reviewed this product", 404))
    !review || res.json({ message: "updated successfully", review })
})
let deleteReview = catchError(async (req,res,next)=>{
    let document = await Review.findOneAndDelete({_id:req.params.id,user:req.user._id})
    document || next(new AppErorr("document not found",404))
    !document || res.json({message:"deleted successfully"})
})
export {
    addReview,
    allReviews,
    getReview,
    updateReview,
    deleteReview
}