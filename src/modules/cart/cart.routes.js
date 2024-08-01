import { Router } from "express";
import { allowedTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addToCart, applyCoupon, deleteCart, deleteItemFromCart, getLoggedUserCart, updateQuantity } from "./cart.controller.js";

let cartRouter = Router()
cartRouter.route("/")
.post(protectedRoutes , allowedTo('User'),addToCart)
.get(protectedRoutes , allowedTo('User'),getLoggedUserCart)
.delete(protectedRoutes , allowedTo('User'),deleteCart)
cartRouter.route("/:id")
.put(protectedRoutes , allowedTo('User'),updateQuantity)
.delete(protectedRoutes , allowedTo('User'),deleteItemFromCart)
cartRouter.route("/apply-coupon").post(protectedRoutes , allowedTo('User'),applyCoupon)
export default cartRouter