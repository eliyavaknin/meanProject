import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Lesson } from '../model/lesson';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lessons: Lesson[];
  lesson: Lesson = { _id: 0, title: '', video: '', description: '' };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    // this.getLessonDetails(this.route.snapshot.params['id']);
    this.lessons = this.dataService.getLessons();
    console.log("__________________" + this.lessons);
    this.lesson = this.lessons.find(element => element._id == this.route.snapshot.params['id']);
    this.isLoadingResults = false;

    console.log("__________________" + this.lesson);

  }
  getLessonDetails(id) {
    this.api.getLesson(id)
      .subscribe(data => {
        this.lesson = data;
        console.log(this.lesson);
        this.isLoadingResults = false;
      });
  }
  deleteLesson(lessonId) {
    this.isLoadingResults = true;
    var courseId = this.dataService.getCourseId()
    this.api.deleteLesson(courseId, lessonId)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/course-details', courseId]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}
