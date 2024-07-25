import slugify from "slugify"
import { AppErorr } from "../../utils/appError.js"
import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"
import { deleteImage } from "../../utils/deleteOldImage.js"
import { deleteOne } from "../../utils/deleteOne.js"
import { getAll } from "../../utils/getAll.js"
import { getOne } from "../../utils/getOne.js"
let addUser = catchError(async (req,res,next)=>{
    let user = new User(req.body)
    await user.save()
    res.json({message:"User added successfully",newUser:user})
})
let allUsers = getAll(User)
let getUser = getOne(User)
let updateUser = catchError(async (req,res,next)=>{
    let User = await User.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    User || next(new AppErorr("User not found",404))
    !User || res.json({message:"updated successfully",User})
})
let deleteUser = deleteOne(User)
export{
    addUser,
    allUsers,
    getUser,
    updateUser,
    deleteUser
}