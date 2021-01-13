import { Injectable } from '@angular/core';
import { courseActionTypes, coursesLoaded, updateCourse } from './course.actions';
import { CourseService } from '../services/course.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, concatMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Course } from '../model/course.model';

@Injectable()
export class CourseEffects {

  constructor(
    private courseService: CourseService,
    private actions$: Actions,
    private router: Router
  ) { }

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.loadCourses),
      concatMap((action) => this.courseService.getAllCourses()),
      map(courses => courseActionTypes.coursesLoaded({ courses: courses }))
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.createCourse),
      concatMap((action: any) => this.courseService.createCourse(action.course)),
      tap(() => this.router.navigateByUrl('/courses'))
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.deleteCourse),
      concatMap((action) => this.courseService.deleteCourse(action.courseId))
    ),
    { dispatch: false }
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(courseActionTypes.updateCourse),
      concatMap((action) => this.courseService.updateCourse(action.update.id, action.update.changes))
    ),
    { dispatch: false }
  );
}
