//this contains code after refractoring

const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const rootDir =  require( '../utils/path'); //getting util where we stored path of rootDir

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback)=>{
     //after using data storage 
     fs.readFile(p,(error, fileContent)=>{
        if(error){//when no such file found.
            return callback([]);//because fetch all always returns a array
        }
        return callback(JSON.parse(fileContent));//if no error
    });
};

module.exports = class Product{ //we name Classes with first name capital
    constructor(id,title, imgUrl, price, description){
        this.title = title;//this is used to override closure of function and reflect changes in parent.
        this.imgUrl = imgUrl;
        this.price =  price;
        this.description =  description;
        this.id = id;
    };

    save(){
        getProductsFromFile(products=>{
            if(this.id){
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex]= this;
                //writeFile will always replace the old content
                fs.writeFile(p, JSON.stringify(updatedProducts), (error)=>{//call it on updatedProduct
                    console.log(error);
                });
            }else{
                this.id = Math.random().toString(); //adding random string id 
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(error)=>{//object to JSON
                    console.log(error); //callback to log error
                });
            }
        });
    };

    static fetchAll(callback){
        //after making code refractorable and using data storage
        getProductsFromFile(callback);
    };

    static deleteById(id){
        getProductsFromFile(products=>{
            const product = products.find(product => product.id === id);
            const updatedProducts = products.filter(product => product.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err)=>{
                //we will delete the product from cart also if no error, 
                //because we do not want an erraneous cart deletion
                if(!err){
                    Cart.deleteProduct(id, product.price);
                };
            });
        });
    };

    static findById(id, callback){
        getProductsFromFile(products => {
            const product = products.find(product => product.id === id);
            callback(product);
        });
    }
}

