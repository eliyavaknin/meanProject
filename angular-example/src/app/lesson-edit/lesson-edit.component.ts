import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Lesson } from '../model/lesson';
import { LessonReq } from '../model/lessonReq';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.css']
})
export class LessonEditComponent implements OnInit {
  courseId: number;
  lessons: Lesson[];
  lesson: Lesson;
  lessonForm: FormGroup;
  _id: number = 0;
  title: string = '';
  description: string = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.getLesson(this.route.snapshot.params['id']);
    this.courseId = this.dataService.getCourseId();

    this.lessonForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
    this.lessons = this.dataService.getLessons();
    console.log("__________________" + this.lessons);
    this.lesson = this.lessons.find(element => element._id == this.route.snapshot.params['id']);
    this.isLoadingResults = false;
  }
  getLesson(id) {
    this.api.getLesson(id).subscribe(data => {
      this._id = data._id;
      this.lessonForm.setValue({
        title: data.title,
        description: data.description
      });
    });
  }

  onFormSubmit(form: NgForm) {

    this.isLoadingResults = true;
    const req: LessonReq = { "courseId": this.courseId, "title": form["title"], "description": form["description"] };

    this.api.updateLesson(this._id, req)
      .subscribe(res => {
        // let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/lesson-details', this._id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  lessonDetails() {
    this.router.navigate(['/lesson-details', this._id]);
  }

}
