const fs = require('fs');
const path = require('path');
const rootDir= require('../utils/path');
const Product = require('./product');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
    //fetch previous cart
    static addProduct(id, productPrice){
        const product = fs.readFile(p, (err, fileContent)=>{
            let cart = {products:[], totalPrice: 0};
            if(!err){// no error means file wasn't empty
                cart = JSON.parse(fileContent);
            };
            //analyze cart => find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct; //update the quantity of product
            if(existingProduct){
                //if exiting then increase the count of that product
                updatedProduct = {...existingProduct};
                updatedProduct.qty += 1;
                cart.products = [...cart.products];//just to show and ensure, works without also
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                //add new product if not existing product
                updatedProduct = {id : id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            };
            cart.totalPrice = cart.totalPrice + +productPrice; //productPrice is string hence +productPrice becomes int
            //write the changes in cart to the file
            fs.writeFile(p, JSON.stringify(cart), (err)=>{
                console.log(err);
            });

        });   
    };

    static deleteProduct(id , price){
        //load products from cart
        fs.readFile(p, (err, fileContent)=>{
            if(err){//when cart empty
                return
            };
            //get product from id
            //get its qty
            //made Updatedproducts using spread
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(product => product.id === id);
            if(!product){//product not found in the cart simply exit
                return;
            };
            const productQty = product.qty;
            //updated total price
            const totalPrice = cart.totalPrice - productQty * price;

            //filtre Updatedproducts and fed to updatedCart
            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            
            //updateprice of cart
            updatedCart.totalPrice = totalPrice;

            //pushed the cart into the file
            fs.writeFile(p, JSON.stringify(updatedCart), (err)=>{
                console.log(err);
            });
        });
    };
    static getCart(callback){
        fs.readFile(p, (err, fileContent) => {
            if(err){//when no content
                callback(null);//to show that cart is empty which is also required
            }
            const cart = JSON.parse(fileContent);
            callback(cart);
        });
    };
};