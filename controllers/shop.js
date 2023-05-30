const Product = require('../models/product') //we Name classes with first letter capital
const Cart = require('../models/cart') //we Name classes with first letter capital

// const products = []; //this was before making product model

exports.getRenderProducts = (req, res, next) => {//get is the request this function handles
    // before using render engine
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // after making product model
    //we implement callback method rather than async and await method
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {prods: products, docTitle: 'ALL PRODUCTS', path: '/products'});// after using render engine
    }) //fetching prods from Product class as fetchAll is static function  
};

exports.getRenderProduct = (req,res,next)=>{
    //PARAMS object of express router gives a passed product id in it, "/products:productId" cathes the id.
    const prodId = req.params.productId;
    Product.findById(prodId, product => 
        res.render('shop/product-detail',{product: product, docTitle: product.title, path:'/products'})
    );
    
};

exports.getRenderIndex = (req, res, next) => {
    Product.fetchAll((products)=>{
        res.render('shop/index', {prods: products, docTitle: 'SHOP', path: '/index'});// after using render engine
    })
};

exports.getRenderCart = (req, res, next) => {
    res.render('shop/cart',{docTitle: "YOUR CART",path:'/cart'});
};

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId; //productId is the name of that hidden field
    Product.findById(prodId, (product)=>{  //due to async programming structure we need to use callback structure
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.getRenderOrder = (req, res, next) => {
    res.render('shop/orders',{docTitle: "YOUR ORDER",path:'/orders'});
};

exports.getRenderCheckout = (req, res, next) => {
    res.render('shop/checkout',{docTitle: "CHECKOUT",path:'/checkout'});
};

exports.getCart = (req, res, next)=> {
    Cart.getCart(cart => {
        //get cart
        Product.fetchAll(products => {
            //get array of updated products with their quantity
            const cartProducts = [];
            for(product of products){
                const existingProduct = cart.products.find(prod => prod.id === product.id);
                if(existingProduct){
                    cartProducts.push({prod: product, qty: existingProduct.qty});
                };
            };
            res.render('shop/cart',{path: '/cart',docTitle: 'Your Cart',prods: cartProducts});
        });  
    });    
};

//POST request on delete-from-cart route
exports.deleteCartItem = (req, res, next) => {
    const id = req.body.productId;
    const price = req.body.price;
    Cart.deleteProduct(id, price);
    res.redirect('/cart');

};
