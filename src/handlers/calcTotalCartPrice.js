let TotalCartPrice = 0
let calculateCartPrice = (cart) => {
    cart.cartItems.forEach(item => {
        TotalCartPrice += (item.quantity) * (item.price)
    });
    if (cart.discount) {
        cart.totalCartPriceAfterDiscount = cart.totalCartPrice - (cart.totalCartPrice * coupon.discount / 100);
    }
}
export default calculateCartPrice