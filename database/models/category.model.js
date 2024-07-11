import mongoose from "mongoose";

let categorySchema = new mongoose.Schema({
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
    image: String
},{
    timestamps:true,
    versionKey:false
})
export const Category = mongoose.model("Category",categorySchema)