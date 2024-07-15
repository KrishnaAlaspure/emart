import express from 'express'
import { uploadProductController } from '../controllers/uploadProductController.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'
import { getAllProductsAdminControllers } from '../controllers/getAllProductsAdminControllers.js'
import { UpdateProductDetailController } from '../controllers/UpdateProductDetailController.js'
import { deleteProductController } from '../controllers/deleteProductController.js'


const router=express.Router()

router.post('/uploadProduct', authMiddleware ,uploadProductController)
router.get('/getAllProducts',getAllProductsAdminControllers)
router.put('/updateProductDetail',UpdateProductDetailController)
router.delete(`/deleteProduct/:pid`,deleteProductController)

export default router