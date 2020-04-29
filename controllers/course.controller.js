const Course = require('../models/course.model');


exports.create = function (req, res) {
    let course = new Course({
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        lessons: req.body.lessons
    });

    course.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send(course)
    })
};


exports.course_details = function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err) return next(err);
        update_statistics(course)
        res.send(course);
    })
};

exports.courses_details = function (req, res) {
    Course.find({}, function (err, courses) {
        console.log('res:');
        console.log(courses);
        res.send(courses);
    })
};

exports.update = function (req, res) {
    Course.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, function (err, course) {
        if (err) return next(err);
        res.send(course);
    });
};

exports.delete = function (req, res) {
    Course.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send();
    })
};