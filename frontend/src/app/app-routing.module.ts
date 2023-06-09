import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonAddComponent } from './lesson-add/lesson-add.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { ChatComponent } from './web-socket/socket-io/chat.component';
import { ScrapListComponent } from './scraps/scrap-list/scrap-list.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { CommentAddComponent } from './comment-add/comment-add.component';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { MapComponent } from './map/map.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'map', component: MapComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'statistics', component: StatisticsComponent },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'course-details/:id',
    component: CourseDetailComponent
  },
  {
    path: 'course-add',
    component: CourseAddComponent
  },
  {
    path: 'course-edit/:id',
    component: CourseEditComponent
  },
  {
    path: 'lesson-details/:id',
    component: LessonDetailComponent
  },
  {
    path: 'lesson-add/:courseId',
    component: LessonAddComponent
  },
  {
    path: 'lesson-edit/:id',
    component: LessonEditComponent
  },
  {
    path: 'comment-details/:id',
    component: CommentDetailComponent
  },
  {
    path: 'comment-add/:courseId',
    component: CommentAddComponent
  },
  {
    path: 'comment-edit/:id',
    component: CommentEditComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'scraps',
    component: ScrapListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }