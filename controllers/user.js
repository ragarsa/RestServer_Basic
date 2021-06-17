const { response, request } = require('express');


const getUser = (req=request, res = response) => {
    
    const {q, nombre, apikey, page=1, limit} = req.query;

    res.json({
        msg: 'get API Controller',
        q,
        nombre,
        apikey,
        page, 
        limit
    })
}



const postUser = (req,  res = response) => {
    
    const {name, age} = req.body; 
    

    res.status(201).json({
        msg: 'post API from controller',
        name,
        age
    })
}

const putUser = (req,  res = response) => {
    
    const id = req.params.id
    
    res.json({
        msg: 'put API from controller',
        id
    })
}

const patchUser = (req,  res = response) => {
    res.json({
        msg: 'patch API from controller'
    })
}

const deleteUser = (req,  res = response) => {
    res.json({
        msg: 'delete API from controller'
    })
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}