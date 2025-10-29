import express from 'express'
import { sendOtp } from '../controllers/otpController.js'
import {generateOtp} from '../utils/generateOtp.js'

const router = express.Router()
let otp = generateOtp();

router.post('/sendotp',(req,res)=>{
    otp = generateOtp();
    sendOtp(otp,req.body.email,req,res);
})

router.post('/verify',(req,res)=>{
    try {
        const Otp = req.body.otp;
        if(Otp==otp){
            res.status(200).json({success:true})
        }
        else{
            res.status(400).json({success:false})
        }
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
})

export default router