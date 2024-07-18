import mongoose, { Schema } from "mongoose";

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
categorySchema.post("init",function(doc){
    doc.image= "http://localhost:3000/uploads/categories/" + doc.image
})
export const Category = mongoose.model("Category",categorySchema)