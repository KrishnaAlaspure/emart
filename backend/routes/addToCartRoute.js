import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addToCartController } from '../controllers/addToCartController.js'
import { countAddtoCartItems } from '../controllers/countAddtoCartItems.js'
import { addToCartViewController } from '../controllers/addToCartViewController.js'
import { updateCartProductQuantityController } from '../controllers/updateCartProductQuantityController.js'
import { deleteProductFromCartController } from '../controllers/deleteProductFromCartController.js'

const router=express.Router()


router.post('/addToCart',authMiddleware,addToCartController)
router.get('/countAddtoCartItems',authMiddleware,countAddtoCartItems)
router.get('/addToCartViewController',authMiddleware,addToCartViewController)
router.post('/updateCartProductQuantityController',authMiddleware,updateCartProductQuantityController)
router.delete('/deleteProductFromCartController/:_id',authMiddleware,deleteProductFromCartController)


export default router