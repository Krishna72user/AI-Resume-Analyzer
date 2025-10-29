import { transporter } from "../config/nodemailer.config.js"

export const sendOtp =async (otp,email,req,res)=>{
    try {
       let mailOptions =  {
        from: "ResumeAnalyzer",
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}.`, // plain‑text body
        }
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message:error.message });
    }
}

