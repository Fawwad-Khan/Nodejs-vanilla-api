const Product = require('../models/productModel');

const { getPostData } = require('../utils');


//  @desc   Gets All Products
//  @route  GET /api/products 
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log('error', error);
    }
}

//  @desc   Get Single Products
//  @route  GET /api/product/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if(!product){
            res.writeHead(400, {'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'Product not found'}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log('message', error.message)
        res.writeHead(501, {'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: error}));
    }
}

//  @desc   Create A Products
//  @route  POST /api/products 
async function createProduct(req, res) {
    try {
    let body = await getPostData(req);
    const {title, description, price} = JSON.parse(body);

    const product = { 
        title,
        description,
        price
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, {'Content-Type': 'application/json'});
    return res.end(JSON.stringify(newProduct));

    } catch (error) {
        console.log('error', error);
    }
}

//  @desc   Update A Products
//  @route  PUT /api/products/:id 
async function updateProduct(req, res, id) {
    try {
    const product = await Product.findById(id);

    if(!product){
        res.writeHead(400, {'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Product not found'}));
    } else {
        let body = await getPostData(req);
        const {title, description, price} = JSON.parse(body);

        const productData = { 
            title: title || product.title,
            description: description || product.description,
            price: price || product.price
        };

        const updProduct = await Product.update(id, productData);
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(updProduct));
        }
    } catch (error) {
        console.log('error', error);
    }
}

//  @desc   Delete Single Products
//  @route  DELETE /api/product/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        if(!product){
            res.writeHead(400, {'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'Product not found'}));
        } else {
            await Product.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: `Product ${id} has been removed`}));
        }
    } catch (error) {
        console.log('message', error.message)
        res.writeHead(501, {'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: error}));
    }
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}