import express from 'express'
import {dbConnection} from './database/dbConnection.js'
import { bootsrap } from './src/modules/bootsrap.js'
import { globalError } from './src/middleware/globalError.js'
import cors from "cors"
import 'dotenv/config'
import { catchError } from './src/middleware/catchError.js'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51O1vHGLjODzoswEZxSmyzv85DDVc2jslBwLjFr60vWZ2uOLy1sL0BIFCuIn88vf29cqNB3uSe3YLqmZak2wRzS0F00h52WozYv');
const app = express()
app.post('/api/webhook', express.raw({type: 'application/json'}), catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let checkoutSessionCompleted
     let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_Lreu5hwuyUaTcN7izsgjZrYYtKTUebH7")
      if(event.type == "checkout.session.completed"){
         checkoutSessionCompleted = event.data.object
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