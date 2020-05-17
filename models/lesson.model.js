const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lesson = mongoose.model(
    "Lesson",
    new mongoose.Schema({
        // _id: String,
        title: String,
        description: String,
        video: String
    })
);


// Export the model
module.exports = Lesson;