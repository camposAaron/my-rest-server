const bcrypt = require('bcryptjs');
const {response, request } = require('express');
const User = require('../models/User');

const getUsers = (req = request, res = response) => {
    const {q, page, limit=1, apikey } = req.query;

    res.json({
        name: 'get api - controller',
        q,
        page,
        limit,
        apikey
    })
}

const putUsers = (req, res) => {
    const { id } = req.params;
    res.status(400).json({
        id,
        name: 'put api - controller'
    });
}

const postUsers = async(req, res) => {

    const { name, password, email, role} = req.body;
    const user = new User({ name, password, email, role });
    
    //verificar si el correo existe

    //encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    
    await user.save();

    res.json({
        user
    });
}

const deleteUsers = (req, res) => {
    res.json({

        name: 'delete api - controller'
    });
}

const patchUsers = (req, res)=>{
    res.json({

        name: 'patch from api'
    });
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    patchUsers,
    deleteUsers
}