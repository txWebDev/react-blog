const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {type: String, maxlength:50},
    lastName: {type: String, maxlength: 50},
    email: {type: String, trim: true, unique: 1},
    password: {type: String, minlength: 5},
    role: {type: Number, default: 0},
    token: {type: String},
    tokenExp: {type: Number},
});

userSchema.pre('save', function (next){
    const user = this;
    console.log(user);
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(saltRounds, function (error, salt) {
        if(error) return next(error);
        bcrypt.hash(user.password, salt, function (error, hash) {
            if(error) return next(error);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userSchema);

module.exports = { User };