import express from 'express'
import { loginController, logoutController, signupController } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { userDetailsController } from '../controllers/userDetailsController.js'


const router=express.Router()

router.post('/signup',signupController)

router.post('/login',loginController)

router.get('/logout',logoutController)

router.get('/userDetails',authMiddleware,userDetailsController)

export default router;