import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from '.././model/course';
import { Lesson } from '.././model/lesson';
import { LessonReq } from '../model/lessonReq';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
const coursesApiUrl = "http://localhost:3000/courses";
const lessonsApiUrl = "http://localhost:3000/lessons";
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
    return this.http.get<Course>(url).pipe(
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
    return this.http.get<Lesson>(url).pipe(
      tap(_ => console.log(`fetched lesson id=${id}`)),
      catchError(this.handleError<Lesson>(`getLesson id=${id}`))
    );
  }
  deleteLesson(id): Observable<Lesson> {
    const url = `${lessonsApiUrl}/${id}`;

    return this.http.delete<Lesson>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Lesson id=${id}`)),
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
}
