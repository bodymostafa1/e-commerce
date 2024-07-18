import mongoose, { Types } from "mongoose";

let brandSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        unique:[true,"name is required"],
        trim:true,
        minLength:[2,"too short brand name"]
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
brandSchema.post("init",function(doc){
    doc.logo= "http://localhost:3000/uploads/brands/" + doc.logo
})
export const Brand = mongoose.model("Brand",brandSchema)