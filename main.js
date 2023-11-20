const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));


// create routes
app.get('/', (req,response) => {
    // home page
    response.render('index'); // render the home index page
});


app.listen(3000, ()=> {
    console.log('started server on :3000');
});