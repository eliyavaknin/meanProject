import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson = { _id: 0, title: '', video: '', description: '' };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getLessonDetails(this.route.snapshot.params['id']);
  }
  getLessonDetails(id) {
    this.api.getLesson(id)
      .subscribe(data => {
        this.lesson = data;
        console.log(this.lesson);
        this.isLoadingResults = false;
      });
  }
  deleteLesson(id) {
    this.isLoadingResults = true;
    this.api.deleteLesson(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        // this.router.navigate(['/lessons']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}
