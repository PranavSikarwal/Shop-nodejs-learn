const express = require('express');

const adminController = require('../controllers/admin')

const rootDir = require('../utils/path') 

const router = express.Router();

router.get('/add-product',adminController.getAddProduct);//additional /admin path added inside app.js, have a look in app.js.
router.get('/products',adminController.getAdminProducts);//new route

router.post('/add-product',adminController.postAddProduct);//now this will only listen to post requests.

router.get('/edit-product/:productId', adminController.getEditProduct);//passing product id thru PARAM

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;