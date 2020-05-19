const Course = require('../models/course.model');
const Lesson = require('../models/lesson.model');

exports.create = function (req, res) {
    let title = req.body.title
    let description = req.body.description

    let courseId = req.body.courseId
    // console.log("\n>> Add Lesson:\n", lesson);
    console.log("\n>> Add courseId:\n", courseId);
    var id = new Date().getMilliseconds()
    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                lessons: {
                    lesson_id: id.toString(),
                    _id: id,
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
    let title = req.body.title
    let description = req.body.description
    let id = req.params.id
    let courseId = req.body.courseId
    console.log("\n>> Update courseId:\n", courseId);

    return Course.findByIdAndUpdate(
        courseId, {
            $push: {
                lessons: {
                    _id: id,
                    title: title,
                    description: description,
                    // video: lesson.video
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


// exports.destroyLink = function (req, res) {
//     Node.findByIdAndUpdate(
//         req.params.id, {
//             $pull: {
//                 "configuration.links": {
//                     _id: req.params.linkId
//                 }
//             }
//         }, {
//             safe: true,
//             upsert: true
//         },
//         function (err, node) {
//             if (err) {
//                 return handleError(res, err);
//             }
//             return res.status(200).json(node.configuration.links);
//         });
// };



exports.delete = function (req, res) {
    let lessonId = req.params.lessonId
    let courseId = req.params.courseId
    console.log("\n>> Delete courseId:\n", courseId, lessonId);
    console.log("\n>> Delete courseId:\n", lessonId == 76);

    // console.log("________", Course.findById(courseId, ))
    Course.findByIdAndUpdate(
        courseId, {
            $pull: {
                "lessons": {
                    lesson_id: lessonId.toString()
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