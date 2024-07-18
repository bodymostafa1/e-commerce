import fs from "fs/promises"

export const deleteImage = async (model,req,type)=>{
    if (type =="logo") {
        let oldobject = await model.findById(req.params.id)
        const imageName = oldobject.logo.split('/')[5]
        await fs.unlink(`uploads/brands/${imageName}`)
    } else {
        let oldobject = await model.findById(req.params.id)
        const imageName = oldobject.image.split('/')[5]
        await fs.unlink(`uploads/categories/${imageName}`)
    }
}