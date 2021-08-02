const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name : {
        type:  String,
        required: [true, 'The name is requerid']
    },
    email : {
        type: String,
        required : [true, 'An email is required'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'A password is required'],
    },
    img : {
        type: String,
    },
    role : {
        type : String,
        required: true,
        emun : ['ADMIN_ROLE', 'USER_ROLE']
    },
    state : {
        type: Boolean,
        default : true
    },
    google:{
        type: Boolean,
        default : false
    }
});

module.exports = model('User', UserSchema);