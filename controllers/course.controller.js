const Course = require('../models/course.model');


exports.create = function (req, res) {
    console.log("_____________________________")
    let course = new Course({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        lessons: req.body.lessons,
        comments: req.body.comments

    });

    course.save(function (err) {
        if (err) {
            console.log(err);
        }
        // res.send()
        res.send(course)
    })
};


exports.course_details = function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        console.log("_________________________0" + req.params.id)
        if (err) {
            console.log("___________________" + err)
            return next(err);

        }
        // update_statistics(course)
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


exports.groupByCategory = function (req, res) {
    Course.aggregate(
        [{
            $group: {
                _id: {
                    category: "$category"
                }
            }
        }],

        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
};





exports.mapReduce = function (req, res) {
    var o = {};
    o.map = function () {
        emit(this._id, 1)
    }
    o.reduce = function (k, vals) {
        return vals.length
    }

    o.verbose = true;

    Course.mapReduce(o, function (err, model, stats) {
        console.log('map reduce took %d ms', stats.processtime)
        console.log("MapReduce" + JSON.stringify(model));

        res.send(model)

    });
};