const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = mongoose.model(
    "Course",
    new mongoose.Schema({
        // _id: String,
        category: String,
        title: String,
        description: String,
        image: String,
        lessons: [],
        comments: []
    })
);


// Export the model
module.exports = Course