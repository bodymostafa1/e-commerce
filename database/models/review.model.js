import mongoose, { Types } from "mongoose";

let schema = new mongoose.Schema({
    comment:String,
    user:{
        type:Types.ObjectId, 
        ref:"User",
        required:true
    },
    product:{
        type:Types.ObjectId,
        ref:"Product",
        required:true
    },
    rate:{
        type:Number,
        min:0,
        max:5
    }
},{
    timestamps:true,
    versionKey:false
})
export const Review = mongoose.model("Review",schema)