const { response, request } = require('express');
const User = require('../models/User');
const  bcriptjs = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await User.findOne({ email });
        
        if(!usuario){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos -correo'
            });
        }

        //Si el usuario esta activo
        if( !usuario.state ){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos -estado = false'
            })
        }
        
        //verificar la contraseña
        const validPassword = bcriptjs.compareSync(password , usuario.password);
        if(!validPassword){
            res.status(400).json({
                msg : 'Usuario / password no son correctos -constraseña = false'
            })
        }

        //generar el JWT
        const token = await generateJWT(usuario.id);

    
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}