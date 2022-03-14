import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent implements OnInit {

  public points = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getPoints().subscribe(data => {
      this.points = data;
    })
  }

}
