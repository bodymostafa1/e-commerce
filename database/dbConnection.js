import mongoose from "mongoose"
export const dbConnection= mongoose.connect("mongodb://127.0.0.1:27017/e-commerce").catch((err)=>{
    console.log(err)
}).then(()=>{
    console.log("database connected successfuly")
})