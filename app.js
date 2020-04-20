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

const course = require('./routes/course.route'); // Imports routes for the courses
app.use('/courses', course);

const lesson = require('./routes/lesson.route'); // Imports routes for the lessons
app.use('/lessons', lesson);

// app.use(app.router);
// routes.initialize(app);



// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = "mongodb://localhost:27017/mathematics";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));