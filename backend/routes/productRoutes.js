import express from 'express'
import getCategoryProductController from '../controllers/getCategoryProductController.js'
import { getAllProductForCategoryController } from '../controllers/getAllProductForCategoryController.js'
import { getSingleProductDetails } from '../controllers/getSingleProductDetails.js'
import { searchProductController } from '../controllers/searchProductController.js'
import { filterProductController } from '../controllers/filterProductController.js'


const router=express.Router()


router.get('/getProductByCategory',getCategoryProductController)
router.post('/getAllProductsForCategory',getAllProductForCategoryController)
router.post('/getSingleProductDetails',getSingleProductDetails)
router.get('/searchProductController',searchProductController)
router.post('/filterProductController',filterProductController)
export default router