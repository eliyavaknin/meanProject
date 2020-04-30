const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const course = require('./routes/course.route'); // Imports routes for the courses
const lesson = require('./routes/lesson.route'); // Imports routes for the lessons

const app = express();

mongoose.connect("mongodb://localhost:27017/mathematics")
    .then(() => {
        console.log('Connected to database');
    }).catch(() => {
        console.log('Connection failed');
    });
// Set up mongoose connection
// const mongoose = require('mongoose');
// let dev_db_url = "mongodb://localhost:27017/mathematics";
// let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//let port = 3000;

// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept ,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
});
app.use('/courses', course);
app.use('/lessons', lesson);

module.exports = app;