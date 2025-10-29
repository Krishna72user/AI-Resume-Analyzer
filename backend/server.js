import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connect} from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import otpRoutes from './routes/otpRoutes.js'
dotenv.config()

connect()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/',async (req,res)=>{
    res.json({success:true})
})

app.use('/api/auth',authRoutes)
app.use('/api/resume',resumeRoutes)
app.use('/api/otp',otpRoutes)

app.listen(process.env.PORT||5000,()=>{
    console.log("App is running")
})