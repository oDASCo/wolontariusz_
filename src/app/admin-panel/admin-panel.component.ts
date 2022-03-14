import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = [
    // 'username',
    'name',
    //'phone',
    'isHere',
    'workPlace',
    'isAdmin'
  ];
  dataSource = [];
  volunteers;
  allVolunteers;
  public form;
  constructor(public appService: AppService) {
    this.form = new FormGroup({
      nameF: new FormControl()
    });
  }

  ngOnInit() {
    this.appService.getUsers().subscribe(data => {
      data.forEach(item => {
        item.isAdminC = new FormControl(item.isAdmin);
      })
      this.volunteers = this.allVolunteers = data;
    });
    this.form.valueChanges.subscribe(data => {
      console.log(data);
      this.volunteers = this.allVolunteers
      this.filterData(data.nameF);
    })
  }
  filterData(val) {
    this.volunteers = this.volunteers.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
  }
  changeStatus(id, isAdmin) {
    console.log(id);
    this.appService.updateUser(id, {isAdmin}).subscribe();
  }

}
