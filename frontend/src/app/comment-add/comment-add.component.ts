import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommentReq } from '../model/commentReq';
// import { Comment } from '../model/comment';
@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {
  courseId: string;
  commentForm: FormGroup;
  title: string = '';
  description: string = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId']

    this.commentForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
    });
  }
  onFormSubmit(form: NgForm) {

    this.isLoadingResults = true;
    // var req = {};
    // var lesson = {};
    // lesson["title"] = ;
    // lesson["description"] = ;
    // const lesson: Lesson = { "title": this.title, "description": this.description }
    const req: CommentReq = { "courseId": this.courseId, "title": form["title"], "description": form["description"] };
    // req = {};
    // req.courseId = this.courseId;
    // req.lesson.title = this.title;
    // req.lesson.description = this.description;


    this.api.addComment(req)
      .subscribe(res => {
        // let
        // id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
