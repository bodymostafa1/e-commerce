import { Router } from "express";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { addReview, allReviews, deleteReview, getReview, updateReview } from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../authentication/auth.controller.js";
let reviewRouter = Router()
reviewRouter.route("/")
.post( protectedRoutes,allowedTo('User'),uploadSingleFile('logo',"reviews"),addReview).get(allReviews)
reviewRouter.route("/:id")
.get(getReview)
.put(protectedRoutes,allowedTo('User'),uploadSingleFile('logo',"reviews"),updateReview)
.delete(protectedRoutes,allowedTo('User','Admin'),deleteReview)
export default reviewRouter