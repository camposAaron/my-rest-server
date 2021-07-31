const {response, request } = require('express');


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

const postUsers = (req, res) => {

    const { firstName, age, id} = req.body;

    res.json({
        name: 'post api - controller',
        firstName,
        age,
        id
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