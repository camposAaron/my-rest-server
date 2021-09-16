const path = require('path');
const { response } = require("express");

const uploadArchive = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No se encontraron los archivos a subir'
        });
    }

    const { archivo } = req.files;

    /*Validar extension */
    const nameSplit = archivo.name.split('.');
    const extension = nameSplit[ nameSplit.length - 1 ];

    const validExtensions = ['jpg', 'png', 'jpeg','gif'];

    if(!validExtensions.includes(extension)){
        return res.status(400).json({msg : `La extension '${extension}' no es permitida, ${validExtensions}`});
    }

    console.log(nameSplit, extension);

    // const rutaDeCarga = path.join(__dirname , '../uploads/' , archivo.name);

    // archivo.mv(rutaDeCarga, (err) => {
    //     if (err) {
    //         return res.status(500).json({err});
    //     }

    //     res.send('Archivo subido a: ' + rutaDeCarga);
    // });

}

module.exports = {
    uploadArchive
}