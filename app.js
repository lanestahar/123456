const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mrCrawler = require('./index.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mrCrawler.happyCrawler();

const port = 3030;
app.listen(port, () => {
    console.log('App is running at port: ' + port);
})