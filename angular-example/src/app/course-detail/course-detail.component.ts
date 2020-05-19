import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Course } from '../model/course';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course = { _id: 0, title: '', description: '', lessons: [], comments: [] };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getCourseDetails(this.route.snapshot.params['id']);

  }

  getCourseDetails(id) {
    this.api.getCourse(id)
      .subscribe(data => {
        this.course = data;
        console.log(this.course);
        this.isLoadingResults = false;
        this.dataService.initLessons(data.lessons);
        this.dataService.initComments(data.comments);
        this.dataService.initCourseId(data._id);
      });
  }

  deleteCourse(id) {
    this.isLoadingResults = true;
    this.api.deleteCourse(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
}
