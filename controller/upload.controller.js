const { response } = require("express");


const  uploadArchive = (req, res = response) => {
    res.json({msg : 'cargando archivo'});
}

module.exports = {
    uploadArchive
}