import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  courseForm: FormGroup;
  _id: number = 0;
  title: string = '';
  description: number = null;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCourse(this.route.snapshot.params['id']);
    this.courseForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  getCourse(id) {
    this.api.getCourse(id).subscribe(data => {
      this._id = data._id;
      this.courseForm.setValue({
        title: data.title,
        description: data.description
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCourse(this._id, form)
      .subscribe(res => {
        let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/course-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  courseDetails() {
    this.router.navigate(['/course-details', this._id]);
  }

}
