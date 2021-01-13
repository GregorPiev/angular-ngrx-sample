import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCourse } from '../../store/course.actions';

import { AppState } from 'src/app/store/reducers';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../../model/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm: any): void {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }
    const course: any = {
      id: uuidv4(),
      name: submittedForm.value.name,
      description: submittedForm.value.description,
    }
    this.store.dispatch(createCourse({ course }));
  }

}
