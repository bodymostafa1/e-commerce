import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { changeUserPassword, signIn, signUp } from "./auth.controller.js";
let authRouter = Router()
authRouter.route("/signup")
.post(checkEmail,signUp)
authRouter.route("/signin").post(signIn)
authRouter.route("/change-password").patch(changeUserPassword)
export default authRouter