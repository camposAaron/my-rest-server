const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
   
    if( !req.user ){
        res.status(500).json({msg : 'no se puede verficar un usuario sin haber generado un token'});
    }

    //verificando rol de usuario autenticado
    const { role, name } = req.user;
    if( role !== 'ADMIN_ROLE'){
        res.status(401).json({msg : `${name} no es administrador`});
    }

    next();

}   

module.exports = {
    isAdminRole
}