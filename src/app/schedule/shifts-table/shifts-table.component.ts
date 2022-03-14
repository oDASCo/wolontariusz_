import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrls: ['./shifts-table.component.scss']
})
export class ShiftsTableComponent implements OnInit {
  public shifts = [];
  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.getShifts().subscribe(data => {
      this.shifts = data;
    });
  }

  deleteShift(id, time, person) {
    const data = {
      time,
      id,
      user: person
    };
    const params = new HttpParams()
      .set('time', time)
      .set('phone', person.phone)
      .set('id', id);
    this.appService.deleteShift(id, params).subscribe(data => {
      this.shifts = data;
    });

  }

}
