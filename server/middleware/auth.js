const { User } = require('../models/user');

let auth = (req,res,next) => {
    let token = req.cookies.x_auth;
    User.findByToken(token, (error, userData)=>{
        if(error) throw error;
        if(!userData) return res.status(401).json({sucess: false, error:"User not authenticated"});
        req.token = token;
        req.user = userData;
        next();
    });
}

module.exports = {auth};