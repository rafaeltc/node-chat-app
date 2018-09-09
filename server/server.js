const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();

//configure express static middleware 
app.use(express.static(publicPath));

//startup server
app.listen(port, () => console.log('Server is listening on port 3000'))
