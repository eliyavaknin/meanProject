import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from '.././model/course';
import { Lesson } from '.././model/lesson';
import { Comment } from '.././model/comment';

import { LessonReq } from '../model/lessonReq';
import { CommentReq } from '../model/commentReq';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
const coursesApiUrl = "http://localhost:3000/courses";
const lessonsApiUrl = "http://localhost:3000/lessons";
const commentApiUrl = "http://localhost:3000/comments";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(coursesApiUrl)
      .pipe(
        tap(heroes => console.log('fetched courses')),
        catchError(this.handleError('getCourses', []))
      );
  }

  getCourse(id: number): Observable<Course> {
    const url = `${coursesApiUrl}/${id}`;
    return this.http.get<Course>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  addCourse(course): Observable<Course> {
    return this.http.post<Course>(coursesApiUrl, course, httpOptions).pipe(
      tap((course: Course) => console.log(`added Course w/ id=${course._id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  updateCourse(id, course): Observable<any> {
    const url = `${coursesApiUrl}/${id}`;
    return this.http.put(url, course, httpOptions).pipe(
      tap(_ => console.log(`updated Course id=${id}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  deleteCourse(id): Observable<Course> {
    const url = `${coursesApiUrl}/${id}`;

    return this.http.delete<Course>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  addLesson(lesson): Observable<LessonReq> {
    return this.http.post<LessonReq>(lessonsApiUrl, lesson, httpOptions).pipe(
      tap((lesson: LessonReq) => console.log(`added Lesson w/ }`)),
      catchError(this.handleError<LessonReq>('addLesson'))
    );
  }
  getLesson(id: number): Observable<Lesson> {
    const url = `${lessonsApiUrl}/${id}`;
    return this.http.get<Lesson>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched lesson id=${id}`)),
      catchError(this.handleError<Lesson>(`getLesson id=${id}`))
    );
  }
  deleteLesson(courseId, lessonId): Observable<Lesson> {
    const url = `${lessonsApiUrl}/${courseId}/${lessonId}`;

    return this.http.delete<Lesson>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Lesson id=${lessonId}`)),
      catchError(this.handleError<Lesson>('deleteLesson'))
    );
  }
  updateLesson(id, lesson): Observable<any> {
    const url = `${lessonsApiUrl}/${id}`;
    return this.http.put(url, lesson, httpOptions).pipe(
      tap(_ => console.log(`updated Lesson id=${id}`)),
      catchError(this.handleError<any>('updateLesson'))
    );
  }

  addComment(comment): Observable<CommentReq> {
    return this.http.post<CommentReq>(commentApiUrl, comment, httpOptions).pipe(
      tap((comment: CommentReq) => console.log(`added comment w/ }`)),
      catchError(this.handleError<CommentReq>('addComment'))
    );
  }
  getComment(id: number): Observable<Comment> {
    const url = `${commentApiUrl}/${id}`;
    return this.http.get<Comment>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched comment id=${id}`)),
      catchError(this.handleError<Comment>(`getComment id=${id}`))
    );
  }
  deleteComment(courseId, commentId): Observable<Comment> {
    const url = `${commentApiUrl}/${courseId}/${commentId}`;

    return this.http.delete<Comment>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Comment id=${commentId}`)),
      catchError(this.handleError<Comment>('deleteComent'))
    );
  }
  updateComment(id, comment): Observable<any> {
    const url = `${commentApiUrl}/${id}`;
    return this.http.put(url, comment, httpOptions).pipe(
      tap(_ => console.log(`updated Comment id=${id}`)),
      catchError(this.handleError<any>('updateComent'))
    );
  }
}
