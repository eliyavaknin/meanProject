import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  courseForm: FormGroup;
  title: string = '';
  description: number = null;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCourse(form)
      .subscribe(res => {
        // let id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
