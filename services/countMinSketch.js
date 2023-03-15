var createCountMinSketch = require("count-min-sketch")

//Create data structure
var sketch = createCountMinSketch()


exports.update_statistics = function (course) {
    sketch.update(course.name, 1)
    sketch.update(course.lessons.length, 1)
};

exports.get_statistics_by_courses = function (courses) {
    var dict = [];
    courses.forEach(function (course) {
        course_name = course.title
        dict.push({
            key: title,
            value: sketch.query(title)

        });
        return dict;
    });

};


exports.get_statistics_by_lessons_count = function () {
    var dict = [];
    //TODO: add dynamic min and max
    range = Array(8).fill()
    range.keys.forEach(function (course) {
        lesson_count = i
        dict.push({
            key: i,
            value: sketch.query(i)

        });
        return dict;
    });

};