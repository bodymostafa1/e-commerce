import mongoose from "mongoose"
export const dbConnection= mongoose.connect("mongodb+srv://bodymostafa188:nBE1BfDznrl3mWvn@cluster0.ku3pnn3.mongodb.net/ecomm").catch((err)=>{
    console.log(err)
}).then(()=>{
    console.log("database connected successfuly")
})