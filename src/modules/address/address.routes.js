import { Router } from "express";
import { allowedTo, protectedRoutes } from "../authentication/auth.controller.js";
import { addToAdresses, deleteFromAdresses, getUserAdresses } from "./address.controller.js";


let addressRouter = Router()
addressRouter.route("/")
.patch(protectedRoutes , allowedTo('User'),addToAdresses).get(protectedRoutes , allowedTo('User'),getUserAdresses)
addressRouter.route("/:id")
.delete(protectedRoutes , allowedTo('User','Admin'),deleteFromAdresses)
export default addressRouter