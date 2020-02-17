const express = require('express');
const app = express();

//Routing
app.get('/', (req,res)=>{
    res.send('Hello World');
});

const port = 3000;
app.listen(port, ()=>console.log(`Server listening on port ${port}`));