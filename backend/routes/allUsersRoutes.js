import express from 'express'
import { allUsersControllers } from '../controllers/allUsersControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { updateUserInfo } from '../controllers/updateUserInfo.js'
import { deleteUserController } from '../controllers/deleteUserController.js'


const router=express.Router()

// admin panel all users routes
router.get('/allUsers',authMiddleware,allUsersControllers)
router.put(`/updateUserInfo`,authMiddleware, updateUserInfo)
router.delete(`/deleteUser/:userID`,authMiddleware,deleteUserController)


export default router