import { Injectable } from '@angular/core';
import { Course } from '../model/course.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class CourseService {
  // http: HttpClient;

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.baseURL}/courses`).
      pipe(map(courses => {
        /* let entities = [];
        entities = Object.values(courses['entities']).map(item => item); */
        return courses;
      }));
  }

  createCourse(course: Course): Observable<any> {
    return this.http.post<any>(`${environment.baseURL}/courses`, course);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}/courses/` + courseId);
  }

  updateCourse(courseId: string | number, changes: Partial<Course>): Observable<any> {
    return this.http.put(`${environment.baseURL}/courses/` + courseId, changes);
  }
}
