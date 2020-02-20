const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/keys');
const { User } = require('./models/user');
const app = express();
//DDBB connection
mongoose.connect(config.mongoURI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    )
    .then(()=>console.log('DDBB connected'))
    .catch((error) => console.log('DDBB connection error: ', error))
//Middleware
const { auth } = require('./middleware/auth');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
//Routing
app.get('/api/user/auth', auth, (req,res)=>{
    res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        isAuth: true

    });
});
app.post('/api/users/register', (req,res)=>{
    const user = new User(req.body);
    user.save((error, userData)=>{
        if(error) return res.status(400).json({success: false, error});
        return res.status(200).json({success: true, userData})
    });
});
app.post('/api/users/login', (req,res)=>{
    User.findOne({email: req.body.email}, (error, userData)=>{
        if(!userData) return res.status(400).json({success: false, error: 'User not found'});
        userData.comparePassword(req.body.password, (error, isMatch) => {
            if(!isMatch){
                return res.status(401).json({sucess: false, error: 'Wrong password'});
            }
            userData.generateToken((error, userData)=>{
                if(error) return res.status(400).json({success: false, error});
                res.cookie('x_auth', userData.token).status(200).json({success: true});
    
            });
        });
    });

});
app.get('/api/user/logout', auth, (req, res)=>{
    User.findOneAndUpdate({"_id": req.user.id}, {token: ""}, (error, userData)=>{
        if(error) return res.json({success: false, error: error});
        
        return res.status(200).json({success: true});
    });
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server listening on port ${port}`));