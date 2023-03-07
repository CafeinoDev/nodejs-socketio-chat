const { request, response } = require("express");
const { Category } = require("../models");

const getCategories = async(req = request, res = response) => {

    const { limit = 3, from = 0 } = req.query;

    const filter = {
        status: true
    }

    const [total, categories ] = await Promise.all([
        Category.countDocuments(),
        Category.find(filter).limit(limit).skip(from).populate('user', 'name')
    ]);

    res.json({
        total,
        categories
    })
}

// Get Category - populate
const getCategory = async(req = request, res = response) => {
    const { id } = req.params;

    const category = await Category.findById( id ).populate('user', 'name');

    res.json(category);
}

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryExists = await Category.findOne({ name })

    if( categoryExists ){
        return res.status(400).json({
            msg: 'Category already exist'
        })
    }

    category = new Category({
        name,
        user: req.user._id
    })

    await category.save();

    res.json({
        category
    })
}

// Update Category
const updateCategory = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const { id } = req.params;
    const { _id } = req.user;

    try{
        const category = await Category.findByIdAndUpdate(id, {
            name,
            user: _id
        }, {new: true})

        category.save();

        res.json(category);
    }catch(err){
        res.status( 500 ).json({
            msg: 'Something goes wrong'
        })
    }
}

// Delete Category - Change Status
const deleteCategory = async(req = request, res = response) => {
    
    const { id } = req.params;
    const { _id } = req.user;
    try{
        const category = await Category.findByIdAndUpdate(id, {
            status: false,
            user: _id
        }, { new: true });

        res.json(
            category
        )

    }catch{
        res.status( 500 ).json({
            msg: 'Something goes wrong'
        })
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory
}