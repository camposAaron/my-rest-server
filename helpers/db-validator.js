const Rol = require('../models/role');
const { User, Category, Product } = require('../models/index');

//verificar si el rol es valido
const isRoleValid = async (role = '') => {
    const existRole = await Rol.findOne({ role });
    console.log(existRole);
    if (!existRole) {
        throw new Error(`El rol ${role} no existe en la BD`);
    }
}

//Verificar si el correo existe
const existsEmail = async ( email = '') => {
    const emailfound = await User.findOne({ email });
    if (emailfound) {
        throw new Error(`El correo ya esta registrado`);
    }
}

//Verificar si el id del usuario existe
const existsId = async ( id ) => {
    const idFound = await User.findById( id );
    if (!idFound) {
        throw new Error(`El id ${id} no existe`);
    }
}

const existsCategoryId = async( id ) => {
    const idfound = await Category.findById( id );
    if(!idfound){
        throw new Error(`El id: ${id} no existe`);
    }
}

const existsProduct = async(id) => {
    const idFound = await Product.findById(id);

  

    if(!idFound.state){
        throw new Error(`id no encontrado -state: false`);
    }
    

    if(!idFound){
        throw new Error(`el id: ${id} no existe`);
    }
}


module.exports = {
    isRoleValid,
    existsEmail,
    existsId,
    existsCategoryId,
    existsProduct
}