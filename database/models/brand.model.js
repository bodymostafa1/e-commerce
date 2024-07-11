import mongoose, { Types } from "mongoose";

let brandSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        unique:[true,"name is required"],
        trim:true,
        minLength:[2,"too short category name"]
    },
    slug:{
        type:String, 
        required:true,
        lowercase:true
    },
    logo:String
},{
    timestamps:true,
    versionKey:false
})
export const Brand = mongoose.model("Brand",brandSchema)