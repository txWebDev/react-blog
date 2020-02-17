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
    }
)
.then(()=>console.log('DDBB connected'))
.catch((error) => console.log('DDBB connection error: ', error))
//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
//Routing
app.get('/', (req,res)=>{
    res.send('Hello World');
});
app.post('/api/users/register', (req,res)=>{
    const user = new User(req.body);
    user.save((error, userData)=>{
        if(error) return res.json({sucess: false, err})
    });
    return res.status(200).json({sucess: true})
});

const port = 5000;
app.listen(port, ()=>console.log(`Server listening on port ${port}`));