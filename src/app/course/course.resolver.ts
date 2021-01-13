
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { areCoursesLoaded } from './store/course.selectors';
import { coursesLoaded, loadCourses } from './store/course.actions';

@Injectable()
export class CourseResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areCoursesLoaded),
        // tslint:disable-next-line: no-shadowed-variable
        tap((coursesLoaded) => {
          if (!coursesLoaded) {
            this.store.dispatch(loadCourses())
          }
        }),
        filter(coursesLoaded => coursesLoaded),
        first()
      );
  }
}
