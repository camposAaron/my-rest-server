const { response } = require("express");
const path = require('path');
const fs = require('fs');
const { uploadArchive } = require('../helpers');
const { User, Product } = require('../models');

//ruta para imagen no encontrada.
const pathNotFoundImg = path.join(__dirname, '../assets/no-image.jpg');

const uploadImg = async (req, res = response) => {

    try {

        const name = await uploadArchive(req.files);
        // const name = await uploadArchive(req.files, ['md', 'txt'],'textos');
        res.json({ name });

    } catch (err) {

        res.status(400).json({ err });
    }
}


const updateImg = async (req, res = response) => {

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El usuario con id : ${id} no existe`
                });
            }

            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `El producto con id : ${id} no existe`
                });
            }

            break;

        default:
            return res.status(500).json({
                msg: `la coleccion ${collection} no esta definida`
            });
            break;
    }

    try {
        //verificar si existe imagen previa
        if (model.img) {
            const pathComplete = path.join(__dirname, '../uploads', collection, model.img);
            //verificar si la ruta existe para despues borrarla
            if (fs.existsSync(pathComplete))
                fs.unlinkSync(pathComplete);
        }

        const name = await uploadArchive(req.files, undefined, collection);
        model.img = name;

        await model.save();

        res.json({ model });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const getImage = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                res.status(400).json({
                    msg: `El usuario con id ${id} no existe`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);
            if (!model) {
                res.status(400).json({
                    msg: `El producto con id ${id} no existe`
                });
            }
            break;

        default:
            res.status(400).json({
                msg: 'Coleccion no definida consulte con el desarrollador del servidor'
            });
    }


    if (model.img) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) 
            res.sendFile(pathImage);
        else    
            res.sendFile(pathNotFoundImg);
        
    } else {
        res.sendFile(pathNotFoundImg);
    }

}

module.exports = {
    uploadImg,
    updateImg,
    getImage
}