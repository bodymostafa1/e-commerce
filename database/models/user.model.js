import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt"
let schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    passwordChangedAt:Date
})
schema.pre('save',function (){
    this.password = bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate',function (){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password,8)
})
export const User = mongoose.model("User",schema)
