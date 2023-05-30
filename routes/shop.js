const express = require('express');

// const path = require('path');was required for path.join(__parentdir,'..','views','shop.html') function.

const shopController =  require('../controllers/shop');

const rootDir = require('../utils/path');

// const adminData = require('./admin');

const router = express.Router();

router.get('/',shopController.getRenderIndex);

router.get('/products', shopController.getRenderProducts);

// router.get('/products/delete'); //such specific routes should be added before dynamic routes

//:productId is ROUTE PARAMS object feature given by express router
router.get('/products/:productId',shopController.getRenderProduct); //this is a dynamic route hence should be added after specific routes as above

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.get('/orders',shopController.getRenderOrder);

router.get('/checkout',shopController.getRenderCheckout);

router.post('/delete-from-cart',shopController.deleteCartItem);

module.exports = router;
