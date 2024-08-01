import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"


let addToAdresses = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.user._id, { $push: { address: req.body } }, { new: true })
    user || next(new AppErorr("user not found", 404))
    !user || res.json({ message: "updated successfully", addresses: user.address })
})
let deleteFromAdresses = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.user._id, { $pull: { address: { _id: req.params.id } } }, { new: true })
    user || next(new AppErorr("user not found", 404))
    !user || res.json({ message: "updated successfully", addresses: user.address })
})
let getUserAdresses = catchError(async (req, res, next) => {
    let user = await User.findById(req.user._id)
    user || next(new AppErorr("user not found", 404))
    !user || res.json({ message: "updated successfully", addresses: user.address })
})
export {
    addToAdresses,
    deleteFromAdresses,
    getUserAdresses
}