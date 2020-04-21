import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Course } from '.././model/course';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
const apiUrl = "http://localhost:1234/courses";

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
    return this.http.get<Course[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched courses')),
        catchError(this.handleError('getCourses', []))
      );
  }

  getCourse(id: number): Observable<Course> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => console.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  addCourse(course): Observable<Course> {
    return this.http.post<Course>(apiUrl, course, httpOptions).pipe(
      tap((course: Course) => console.log(`added Course w/ id=${course._id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  updateCourse(id, course): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, course, httpOptions).pipe(
      tap(_ => console.log(`updated Course id=${id}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  deleteCourse(id): Observable<Course> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Course>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

}
