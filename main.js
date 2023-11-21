const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));


// create routes
app.get('/', (req,response) => {
    // home page
    // render the home index page
    response.render('index'); 
});

app.get('/song', (req,response) => {
    // random song page
    // render the song page
    response.render('song'); 
});

app.get('/genre', (req,response) => {
    // random album page
    // render the album page
    response.render('genre'); 
});

app.get('/cover', (req,response) => {
    // random cover page
    // render the cover page
    response.render('cover'); 
});

app.get('/sentence', (req,response) => {
    // speakify page
    // render the sentence page
    response.render('sentence'); 
});

app.listen(3000, ()=> {
    console.log('started server on :3000');
});

