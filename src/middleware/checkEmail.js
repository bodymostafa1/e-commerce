import { User } from "../../database/models/user.model.js";
import { AppErorr } from "../utils/appError.js";

export const checkEmail = async (req, res, next) => {
  let isExist = await User.findOne({ email: req.body.email });
  if (isExist) return next(new AppErorr("email already exists.", 409));
  next();
};
