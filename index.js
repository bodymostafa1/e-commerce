import express from 'express'
import {dbConnection} from './database/dbConnection.js'
import { bootsrap } from './src/modules/bootsrap.js'
import { globalError } from './src/middleware/globalError.js'
import cors from "cors"
import 'dotenv/config'
import { catchError } from './src/middleware/catchError.js'
import Stripe from 'stripe';
import { Cart } from './database/models/cart.model.js'
import { Order } from './database/models/order.model.js'
import { User } from './database/models/user.model.js'
import { Product } from './database/models/product.model.js'
const stripe = new Stripe('sk_test_51O1vHGLjODzoswEZxSmyzv85DDVc2jslBwLjFr60vWZ2uOLy1sL0BIFCuIn88vf29cqNB3uSe3YLqmZak2wRzS0F00h52WozYv');
const app = express()
app.post('/api/webhook', express.raw({type: 'application/json'}),  catchError(async (req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let checkoutSessionCompleted
     let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_Lreu5hwuyUaTcN7izsgjZrYYtKTUebH7")
      if(event.type == "checkout.session.completed"){
         checkoutSessionCompleted = event.data.object
         let user = await User.findOne({email:checkoutSessionCompleted.customer_email})
           //1-get user cart by cartId
        let cart = await Cart.findById(checkoutSessionCompleted.client_reference_id)
        if (!cart) return next(new AppError('cart not found', 404))
        //2-total order Price
        let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
        //3-create order
        let order = new Order({
          user: user._id,
          orderItems: cart.cartItems,
          shippingAddress: checkoutSessionCompleted.metadata,
          totalOrderPrice:checkoutSessionCompleted.amount_total/100,
          paymentType:"card",
          isPaid:true
        })
        await Order.save()
        //4-increment sold & decrement stock
        let options = cart.cartItems.map((prod) => {
            return (
              {
                update0ne: {
                  "filter": { _id: prod.product },
                  "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
                }
              }
            )
            })
            
            await Product.bulkWrite(options)
        //5-clear user cart
        await Cart.findOneAndDelete(cart._id)
        res.json({ message: "success", order })









      }
    res.json({message:'success',checkoutSessionCompleted});
  }));
app.use(cors())
app.use(express.json())
app.use(globalError)
app.use("/uploads",express.static('uploads'))
bootsrap(app)
const port =process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))