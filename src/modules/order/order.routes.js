import { Router } from "express";
import { allowedTo, protectedRoutes } from "../authentication/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from "./order.controller.js";

let orderRouter = Router()
orderRouter.route("/users").get(protectedRoutes , allowedTo('User',"Admin"),getUserOrders)
orderRouter.route("/").get(protectedRoutes , allowedTo("Admin"),getAllOrders)
orderRouter.route("/:id")
.post(protectedRoutes , allowedTo('User'),createCashOrder)
orderRouter.route('/checkout/:id').post(protectedRoutes , allowedTo("User"),createCheckoutSession)
export default orderRouter