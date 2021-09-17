
const { response } = require("express");
const { uploadArchive } = require('../helpers');
const { User, Product } = require('../models');

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
        const name = await uploadArchive(req.files, undefined, collection);
        model.img = name;

        await model.save();

        res.json({ model });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

module.exports = {
    uploadImg,
    updateImg
}