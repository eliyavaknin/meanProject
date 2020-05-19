import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Comment } from '../model/comment';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  comments: Comment[]
  comment: Comment = { _id: 0, title: '', description: '' };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    // this.getCommentDetails(this.route.snapshot.params['id']);
    this.comments = this.dataService.getComments();
    console.log("__________________" + this.comments);
    this.comment = this.comments.find(element => element._id == this.route.snapshot.params['id']);
    this.isLoadingResults = false;
  }
  getCommentDetails(id) {
    this.api.getComment(id)
      .subscribe(data => {
        this.comment = data;
        console.log(this.comment);
        this.isLoadingResults = false;
      });
  }


  deleteComment(commentId) {
    this.isLoadingResults = true;
    var courseId = this.dataService.getCourseId()

    this.api.deleteComment(courseId, commentId)
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
