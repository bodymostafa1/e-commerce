import { Router } from "express";
import { allowedTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addToWishlist, deleteFromWishlist, getUserWishlist } from "./wishlist.controller.js";

let wishlistRouter = Router()
wishlistRouter.route("/")
.patch(protectedRoutes , allowedTo('User'),addToWishlist).get(protectedRoutes , allowedTo('User'),getUserWishlist)
wishlistRouter.route("/:id")
.delete(protectedRoutes , allowedTo('User','Admin'),deleteFromWishlist)
export default wishlistRouter