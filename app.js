import express from 'express'
import {dbConnection} from './database/dbConnection.js'
import { bootsrap } from './src/modules/bootsrap.js'
import { globalError } from './src/middleware/globalError.js'
import 'dotenv/config'
const app = express()
app.use(express.json())
app.use(globalError)
app.use("/uploads",express.static('uploads'))
bootsrap(app)
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))