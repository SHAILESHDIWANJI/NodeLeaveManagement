
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from "./config/db.js"
import { globalErrorHandler } from './middleware/globalErrorHandler.js'
const app = express()
import employeeRoutes from './features/employeeRoutes.js'

app.use(cors())

app.use(express.json())
connectDB()
app.use('/employee', employeeRoutes)

app.use(globalErrorHandler)
app.listen(5500,()=>{
    console.log(`server is running on http://localhost:5500 `,)
})