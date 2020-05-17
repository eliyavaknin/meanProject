const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        // _id: String,
        title: String,
        description: String,
        author: String,
    })
);


// Export the model
module.exports = Comment