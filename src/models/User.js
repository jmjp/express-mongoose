const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    email:{
        type: String,
        required: true,
        minlength: 20,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    lastLogin:{
        type: Date,
        default: Date.now
    }
});


mongoose.model('Users',UserSchema); 