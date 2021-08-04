const Rol = require('../models/role');

const isRoleValid = async( role= '' ) => {
    const existRole = await Rol.findOne({ role });
    console.log(existRole);
    if(!existRole){
        throw new Error(`El rol ${role} no existe en la BD`);
    }
}

module.exports = {
    isRoleValid
}