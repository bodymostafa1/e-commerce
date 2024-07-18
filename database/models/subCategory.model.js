import mongoose, { Types } from "mongoose";

let schema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        unique:[true,"name is required"],
        trim:true,
        minLength:[2,"too short subcategory name"]
    },
    slug:{
        type:String, 
        required:true,
        lowercase:true
    },
    category:{
        type:Types.ObjectId,
        ref:"Category"
    }
},{
    timestamps:true,
    versionKey:false
})
export const SubCategory = mongoose.model("SubCategory",schema)