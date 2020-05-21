// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-statistics',
//   templateUrl: './statistics.component.html',
//   styleUrls: ['./statistics.component.css']
// })
// export class StatisticsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  data: Observable<DataModel>;

  constructor(private http: HttpClient) {
    this.data = this.http.get<DataModel>('./assets/data.json');
  }
}
