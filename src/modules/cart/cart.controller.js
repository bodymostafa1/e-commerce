import { Cart } from "../../../database/models/cart.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import { Product } from "../../../database/models/product.model.js";
import calculateCartPrice from "../../handlers/calcTotalCartPrice.js";
import { catchError } from "../../middleware/catchError.js";
import { AppErorr } from "../../utils/appError.js";

const addToCart = catchError(async (req, res, next) => {
    let isCartExist = await Cart.findOne({ user: req.user._id });
    let product = await Product.findById(req.body.product)
    if (product.quantity < req.body.quantity) return next(new AppErorr("sold out", 404))
    req.body.price = product.price
    if (!isCartExist) {
        let cart = new Cart({
            user: req.user._id,
            cartItems: [req.body]
        });
        calculateCartPrice(cart)
        await cart.save();
        res.json({ message: "success", cart });
    } else {
        let item = isCartExist.cartItems.find(item => item.product == req.body.product)
        if (item) {
            item.quantity += req.body.quantity || 1
            if (item.quantity > product.stock) return next(new AppErorr("sold out", 404))
        } else {
            isCartExist.cartItems.push(req.body)
        }
        calculateCartPrice(isCartExist)
        await isCartExist.save()
        res.json({ message: "success", cart: isCartExist });
    }
});
const updateQuantity = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id })
    let item = cart.cartItems.find(item => item.product == req.params.id)
    if (!item) return next(new AppErorr("product not found", 404))
    item.quantity = req.body.quantity
    calculateCartPrice(cart)
    await cart.save()
    res.json({message:"success",cart:cart})
});
let deleteItemFromCart = catchError(async (req, res, next) => {
    let cart = await Cart.findByIdAndUpdate(req.user._id, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    cart || next(new AppErorr("cart not found", 404))
    calculateCartPrice(cart)
    await cart.save()
    !cart || res.json({ message: "updated successfully", cart: cart })
})
let getLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user._id });
    res.json({ message: "Success", cart });
});
let deleteCart = catchError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Success", cart });
});
const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await Coupon.findOne({ code: req.body.code, expires: { $gte: Date.now() } });
    if (!coupon) return next(new AppErorr('Oops, coupon invalid', 404));
    let cart = await Cart.findOne({ user: req.user._id });
    cart.discount = coupon.discount;
    calculateCartPrice(cart)
    await cart.save();
    res.json({ message: "Success", cart });
  });

export {
    addToCart,
    updateQuantity,
    deleteItemFromCart,
    getLoggedUserCart,
    deleteCart,
    applyCoupon
}