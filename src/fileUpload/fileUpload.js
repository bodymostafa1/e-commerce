import multer from "multer"
import { v4 as uuidv4 } from 'uuid'
import { AppErorr } from "../utils/appError.js"
const fileUpload = (folderName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${folderName}`)
        },
        filename: (req, file, cb) => {
            cb(null, uuidv4() + "-" + file.originalname)
        }
    })
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new AppErorr("images only", 401), false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload
}
export const uploadSingleFile = (feildName,folderName) => fileUpload(folderName).single(feildName)
export const uploadMixOfFiles = (arrayOfFeilds,folderName) => fileUpload(folderName).fields(arrayOfFeilds)