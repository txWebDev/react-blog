const express = require('express');
const mongoose = require('mongoose');
const app = express();
//DDBB connection
mongoose.connect('mongodb+srv://admin-jose:<lyxvlonx>@cluster0-9yqrr.mongodb.net/blog?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(()=>console.log('DDBB connected'))
.catch((error) => console.log('DDBB connection error: ', error))
//Routing
app.get('/', (req,res)=>{
    res.send('Hello World');
});

const port = 3000;
app.listen(port, ()=>console.log(`Server listening on port ${port}`));