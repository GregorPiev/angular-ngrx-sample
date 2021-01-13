import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from './services/course.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { courseReducer } from './store/course.reducers';
import { CoursesListComponent } from './component/courses-list/courses-list.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';




@NgModule({
  declarations: [CoursesListComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('entities', courseReducer),
    EffectsModule.forFeature([CourseEffects])
  ],
  providers: [CourseService],
  exports: [CoursesListComponent, CreateCourseComponent]
})
export class CourseModule { }
