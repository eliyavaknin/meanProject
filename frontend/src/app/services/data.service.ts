import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from '.././model/course';
import { Lesson } from '.././model/lesson';
import { Comment } from '.././model/comment';

import { LessonReq } from '../model/lessonReq';
import { CommentReq } from '../model/commentReq';



@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    lessons: Lesson[];
    comments: Comment[];
    courseId: number;

    initLessons(lessons) {
        this.lessons = lessons;
    }

    getLessons() {
        return this.lessons;
    }

    initComments(comments) {
        this.comments = comments;
    }

    getComments() {
        return this.comments;
    }

    initCourseId(courseId) {
        this.courseId = courseId;
    }

    getCourseId() {
        return this.courseId;
    }


}
