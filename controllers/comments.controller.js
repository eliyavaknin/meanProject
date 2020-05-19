const Course = require('../models/course.model');
const Comment = require('../models/comment.model');

exports.create = function (req, res) {
    let title = req.body.title
    let description = req.body.description

    let courseId = req.body.courseId
    console.log("\n>> Add to course:\n", courseId);
    // console.log("\n>> Add comment:\n", comment);
    var id = new Date().getMilliseconds()

    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                comments: {
                    _id: id,
                    comment_id: id.toString(),
                    title: title,
                    description: description,
                }
            }
        }, {
            new: true,
            useFindAndModify: false
        },
        function (err, course) {
            if (err) return next(err);
            res.send(course);
        }
    );
};

exports.update = function (req, res) {
    let comment = req.body.comment
    let courseId = req.body.courseId
    console.log("\n>> Update courseId:\n", courseId);

    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                comments: {
                    _id: comment._id,
                    title: comment.title,
                    description: comment.description,
                    author: comment.author
                }
            }
        }, {
            new: false,
            useFindAndModify: true
        },
        function (err, course) {
            if (err) return next(err);
            res.send(course);
        }
    );
};

exports.delete = function (req, res) {
    let commentId = req.params.commentId
    let courseId = req.params.courseId
    console.log("\n>> Delete comment:\n", commentId);

    return Course.findByIdAndUpdate(
        courseId, {
            $pull: {
                "comments": {
                    comment_id: commentId.toString()
                }
            }
        }, {
            safe: true,
            upsert: true,
            multi: true,
            useFindAndModify: false
        },
        function (err, course) {
            if (err) return next(err);
            res.send(course);
        }
    );
};