import { AppErorr } from "../utils/appError.js";

export const validate = (schema)=>{
    return async (req,res,next)=>{
        let {err} = schema.validate({image:req.file,...req.body,...req.params,...req.query})

        // else if(req.files.fieldname == 'imageCover'){}
        if(!err){
            next()
        } else{
            let errMsgs = err.map(err=>err.message)
            next(new AppErorr(errMsgs,401))
        }
    }
}