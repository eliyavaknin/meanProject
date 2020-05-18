const Course = require('../models/course.model');
const Lesson = require('../models/lesson.model');

exports.create = function (req, res) {
    let title = req.body.title
    let description = req.body.description

    let courseId = req.body.courseId
    // console.log("\n>> Add Lesson:\n", lesson);
    console.log("\n>> Add courseId:\n", courseId);

    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                lessons: {
                    // _id: lesson._id,
                    title: title,
                    description: description,
                    // video: lesson.video
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
    let lesson = req.body.lesson
    let courseId = req.body.courseId
    console.log("\n>> Update courseId:\n", courseId);

    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                lessons: {
                    _id: lesson._id,
                    title: title,
                    description: lesson.description,
                    video: lesson.video
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
    let lessonId = req.params.lessonId
    let courseId = req.params.courseId
    console.log("\n>> Delete courseId:\n", courseId);

    return Course.findByIdAndUpdate(
        courseId, {
            $pull: {
                "lessons": {
                    id: lessonId
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