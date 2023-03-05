const { responsem, request } = require('express');


const usersGet = (req = request, res = response) => {     
    const { name, apikey, page = 1, limit = 10 } = req.query;
    
    res.json({
        msg: 'API get - From Controller',
        name,
        apikey,
        page,
        limit
    });
}

const usersPost = (req, res = response) => {

    const { name, age } = req.body;

    res.status(201).json({
        msg: 'API post - From Controller',
        name,
        age
    });
};

const usersPut = (req, res = response) => {

    const { id }= req.params;

    res.status(400).json({
        msg: 'API put - From Controller',
        id
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'API delete - From Controller'
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'API patch - From Controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
}