export const generateOtp = (length = 4)=> {
    return Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
}