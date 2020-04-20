const Course = require('../models/course.model');
const Lesson = require('../models/lesson.model');

exports.create = function (req, res) {
    let lesson = req.body.lesson
    let courseId = req.body.courseId
    console.log("\n>> Add Lesson:\n", lesson);
    console.log("\n>> Add courseId:\n", courseId);

    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                lessons: {
                    _id: lesson._id,
                    title: lesson.title,
                    description: lesson.description,
                    video: lesson.video
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