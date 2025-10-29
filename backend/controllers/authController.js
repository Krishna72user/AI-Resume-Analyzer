import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from '../models/User.js'

export const loginUser =async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(email && password){
            const user = await User.findOne({email})
            if(user){
                const status = await bcrypt.compare(password,user.password)
                if(status){
                    const token = jwt.sign({
                        id:user._id,
                    },process.env.SECRET,{ expiresIn: '7d' })
                    res.json({token,success:true})
                }
                else{
                    res.status(400).json({message:"Invalid Credentials",success:false})
                }
            }
            else{
                res.status(404).json({message:"User not found",success:false})
            }
        }
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}


export const registerUser =async (req,res)=>{
        try {
            const {name,email,password} = req.body;
            const isExists = await User.findOne({email})
            if(isExists){
                res.status(400).json({message:"User Already exists",success:false})
            }
            if(name && email && password){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);
                const user = await new User({name,email,password:hash});
                await user.save();
                const token = jwt.sign({
                        id:user._id,
                },process.env.SECRET,{ expiresIn: '7d' })
                res.status(201).json({token,success:true})
            }
            else{
                res.status(400).json({message:"Missing Credentials",success:false})
            }
        } catch (error) {
            res.status(500).json({message:error.message,success:false})
        }
}

export const verifyToken =async (req,res)=>{
    try {
        const token = req.headers['authorization']?.split(" ")[1].trim();
        if(token){
            const decoded = jwt.verify(token,process.env.SECRET)
            if(decoded){
                res.json({success:true})
            }
            else{
                res.status(401).json({message:"Token Expired"})
            }
        }
        else{
            res.status(401).json({"message":'Token is missing.'})
        }
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}

export const getUser = async(req,res)=>{
    try {
        const id = req.id;
        const user = await User.findOne({_id:id})
        if(user){
            res.json({name:user.name,email:user.email,success:true})
        }
        else{
            res.status(404).json({message:"User not found",success:false})
        }
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }
}