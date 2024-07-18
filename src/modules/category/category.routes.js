import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation } from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
let categoryRouter = Router({mergeParams:true})
categoryRouter.use("/:category/subcategories",subCategoryRouter)
categoryRouter.route("/")
.post(uploadSingleFile('image',"categories"),validate(addCategoryValidation),addCategory).get(allCategories)
categoryRouter.route("/:id")
.get(getCategory)
.put(uploadSingleFile('image',"categories"),updateCategory)
.delete(deleteCategory)
export default categoryRouter