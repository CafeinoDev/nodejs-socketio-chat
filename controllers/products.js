const { request, response } = require("express");
const { Product } = require('../models');

const getProducts = async(req = request, res = response) => {
    const { limit = 3, from = 0 } = req.query;

    const filter = {
        status: true
    }

    const [ total, products ] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter).limit(limit).skip(from).populate('category', 'name').populate('user', 'name')
    ]);

    res.json({
        total, 
        limit,
        products
    });
}

const getProduct = async(req = request, res = response) => {

    const { id } = req.params;

    try{
        const product = await Product.findById( id ).populate('category', 'name').populate('user', 'name');

        res.json({
            product
        })
    }catch( Err ){
        return res.status(500).json({
            msg: 'Something goes wrong'
        });
    }
    
}

const createProduct = async(req = request, res = response) => {

    const { price, description, category, stock } = req.body;
    const name = req.body.name.toUpperCase();

    const data = {
        name,
        price,
        description,
        category,
        user: req.user._id,
        stock
    };

    try{

        const product = new Product(data);
        await product.save();

        res.status(201).json(data)

    }catch(err){

        res.status(500).json({
            msg: 'Something goes wrong'
        })

    }
}

const updateProduct = async(req = request, res = response) => {
    const { id } = req.params;

    const { name, price, category } = req.body;

    const { _id } = req.user;
    
    try{
        const data = {
            name,
            price,
            category,
            user: _id
        };

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        res.json(product);
    }catch(err){
        res.status(500).json({
            msg: `Something goes wrong`
        })
    }

}

const deleteProduct = async(req = request, res = response) => {
    const { id } = req.params;

    try{
        const product = await Product.findByIdAndUpdate( id, {
            status: false
        }, { new: true } );

        res.json({
            product
        });
    }catch(err){
        res.status(500).json({ msg: 'Something goes wrong' })
    }

}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}