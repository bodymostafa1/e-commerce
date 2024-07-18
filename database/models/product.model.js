import mongoose, { Types } from "mongoose";

let Schema = new mongoose.Schema({
    title:{
        type:String, 
        required:true,
        unique:[true,"name is required"],
        trim:true,
        minLength:[2,"too short product name"]
    },
    slug:{
        type:String, 
        required:true,
        lowercase:true
    },
    desc:{
        type:String,
        required:true,
        minLength:30,
        maxLength:2000,
    },
    imageCover:String, 
    images:[String],
    price:{
        type:Number,
        required:true,
        min:0
    },
    sold:Number,
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    category:{
        type:Types.ObjectId,
        ref:"Category"
    },
    subCategory:{
        type:Types.ObjectId,
        ref:"subCategory"
    },
    brand:{
        type:Types.ObjectId,
        ref:"Brand"
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5,
    },
    rateCount:Number,
    stock:Number
},{
    timestamps:true,
    versionKey:false
})
Schema.post('init',function (doc){
    doc.imageCover = "http://localhost:3000/uploads/products/" + doc.imageCover
    doc.images = doc.images.map(img =>"http://localhost:3000/uploads/products/" + img)
})
export const Product = mongoose.model("Product",Schema)