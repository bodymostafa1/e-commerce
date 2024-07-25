import { catchError } from "../../middleware/catchError.js"
import { User } from "../../../database/models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AppErorr } from "../../utils/appError.js"
let signUp = catchError(async (req, res, next) => {
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, "ahmed")
    res.json({ message: "success", token })
})
let signIn = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, "ahmed")
        res.json({ message: "success", token })
    }
    next(new AppErorr("email or password incorrect"), 401)
})
let changeUserPassword = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.Newpassword, passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: user._id, role: user.role }, "ahmed")
        res.json({ message: "success", token })
    }
    next(new AppErorr("email or password incorrect"), 401)
})
let protectedRoutes = catchError(async (req, res, next) => {
    let userPayload = null
    let { token } = req.headers
    if (!token) return next(new AppErorr('token is not provided', 401))
    jwt.verify(token, 'ahmed', (err, payload) => {
        if (err) return next(new AppErorr(err, 401))
        userPayload = payload
    })
    let user = await User.findById(userPayload.userId)
    if(!user) return next(new AppErorr("user not found", 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if(time>userPayload.iat) return next(new AppErorr("token not valid please log in again", 401))
        req.user = user
    next()
    }
})
let allowedTo = (...roles)=>{
    return catchError(async (req, res, next) => {
        if (roles.includes(req.user.role)) return next()
        return next(new AppErorr("you are not authorized to use this endpoint ", 401))
    })
}
export {
    allowedTo,
    signIn,
    signUp,
    changeUserPassword,
    protectedRoutes
}