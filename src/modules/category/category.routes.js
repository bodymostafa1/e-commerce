import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";

let categoryRouter = Router()
categoryRouter.route("/")
.post(addCategory).get(allCategories)
categoryRouter.route("/:id")
.get(getCategory)
.put(updateCategory)
.delete(deleteCategory)
export default categoryRouter