const express = require('express');
const bodyParser = require('body-parser');


const app = express();
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

const product = require('./routes/product.route'); // Imports routes for the products
app.use('/products', product);



// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = "mongodb://localhost:27017/mydb";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));