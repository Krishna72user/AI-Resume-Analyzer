import jwt from 'jsonwebtoken'
export const fetchId = async (req,res,next)=>{
    try {
        const token = req.headers['authorization']?.split(" ")[1].trim();
        if(token){
            const decoded = jwt.verify(token,process.env.SECRET)
            req.id = decoded.id
            next();
        }
        else{
            res.status(401).json({"message":'Token is missing.'})
        }
    } catch (error) {
        res.status(401).json({message:error.message,success:false})
    }
}