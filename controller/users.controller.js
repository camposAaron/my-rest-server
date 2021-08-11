const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const User = require('../models/User');


const getUsers = (req = request, res = response) => {
    // const { q, page, limit = 1, apikey } = req.query;

    res.json({
        name: 'get api - controller',
        q,
        page,
        limit,
        apikey
    })
}

const putUsers = async (req, res) => {
    const { id } = req.params;
    const {_id, email, password, google, ...rest } = req.body;

    //TODO validar contra base de datos.
    if (password) {

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
        // rest.email = email;
    }

    const user = await User.findByIdAndUpdate(id, rest, {new : true});

    res.json(user);
}

const postUsers = async (req, res) => {

    const { name, password, email, role } = req.body;
    const user = new User({ name, password, email, role });


    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //Guardar en la base de datos
    await user.save();

    res.json(user);
}

const deleteUsers = (req, res) => {
    res.json({
        name: 'delete api - controller'
    });
}

const patchUsers = (req, res) => {
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