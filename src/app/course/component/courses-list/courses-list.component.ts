import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Course } from './../../model/course.model';
import { CourseService } from './../../services/course.service';
import { getAllCourses } from '../../store/course.selectors';
import { deleteCourse, updateCourse } from '../../store/course.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[] | null>;
  isUpdateActivated: boolean;
  courseToBeUpdated: Course;


  constructor(
    private courseService: CourseService,
    private store: Store<AppState>
  ) {
    this.isUpdateActivated = false;
  }

  ngOnInit(): void {
    console.log('Courses List')
    this.courses$ = this.store.select(getAllCourses);
  }

  showUpdateForm(course: Course): void {
    this.courseToBeUpdated = { ...course };
    this.isUpdateActivated = true;
  }

  deleteCourse(courseId: string): void {
    this.store.dispatch(deleteCourse({ courseId }));
  }

  updateCourse(updateForm: any): void {
    const update: Update<Course> = {
      id: this.courseToBeUpdated.id,
      changes: {
        ...this.courseToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(updateCourse({ update }));
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

}
