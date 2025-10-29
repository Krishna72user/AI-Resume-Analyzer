import express from 'express'
import { loginUser,registerUser,verifyToken,getUser } from '../controllers/authController.js'
import { fetchId } from '../middleware/fetchId.js'

const router = express.Router()

router.post('/login',loginUser)

router.post('/register',registerUser)

router.get('/verify',verifyToken)

router.get('/getuser',fetchId,getUser)

export default router;