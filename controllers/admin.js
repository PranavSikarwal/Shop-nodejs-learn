const Product = require('../models/product') //we Name classes with first letter capital

exports.getAddProduct = (req, res, next)=>{  //get is the request this funciton handles
    res.render(
        'admin/edit-product',
        {docTitle: 'Add-Product', 
        path: '/admin/add-product',
        editing: false
    })
};

exports.postAddProduct = (req,res,next)=>{ //post is the request this function handles
    //after increasing fields
    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    const price = req.body.price;

    // after making product model
    // passing null to the id as new product is added so id will be generated randomly
    const product = new Product(null,title, imgUrl, price, description); //this will create product after passing thru bodyParser.urlencoded()
    product.save();
    res.redirect('/products');
};

exports.getEditProduct = (req, res, next)=>{  //get is the request this funciton handles
    const editMode = req.query.edit; //query contains string key value pairs hence editMode is not boolean
    //hence empty string here denote false
    if (!editMode){
        return res.redirect('/'); //if editMode is not on then probably the user landed here by chance
    };
    //if want boolean value
    //const editMode = req.query.edit==='true'?true:false;

    const id = req.params.productId;
    Product.findById(id, (prods) => {
        res.render(
            'admin/edit-product',
            {docTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: prods
        });   
    });
    
};

exports.postEditProduct = (req, res, next)=>{  //get is the request this funciton handles
    //retreiving product from req body
    id = req.body.id;
    title = req.body.title;
    description = req.body.description;
    price = req.body.price;
    imgUrl = req.body.imgUrl;
    const newProduct = new Product(id, title, imgUrl, price, description);
    newProduct.save();
    res.redirect('/admin/products');
};

//added /admin/products controller.
exports.getAdminProducts = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render(
            'admin/products', 
            {
                prods: products, 
                docTitle: 'ADMIN PRODUCTS', 
                path: '/admin/products',
            });// after using render engine
    })
};

exports.postDeleteProduct = (req,res,next)=>{
    prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};

