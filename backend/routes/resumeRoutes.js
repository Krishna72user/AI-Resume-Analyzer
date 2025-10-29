import express from 'express'
import { upload } from '../config/multer.config.js'
import {analyze} from '../controllers/resumeController.js'
const router = express.Router()

router.post('/analyze',upload.single('resume'),analyze)

export default router