import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  myForm: FormGroup = new FormGroup({
    volunteer: new FormControl(''),
    date: new FormControl(''),
    timeRange: new FormControl('')
  });
  filteredStates: Observable<any[]>;


  public volunteers = [];
  public times  =  ['23:00 - 03:00', '03:00 - 07:00', '07:00 - 11:00', '11:00 - 15:00', '15:00 - 19:00', '19:00 - 23:00'];
  constructor(public appService: AppService, private router: Router,  private _snackBar: MatSnackBar) {
    this.appService.getUsers().subscribe(data => {
      this.volunteers = data;
    });
    this.filteredStates = this.myForm.controls.volunteer.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.volunteers.slice())),
    );
  }

  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();

    return this.volunteers.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    // this.appService.getUsers().subscribe(data => {
    //   this.volunteers = data;
    // });

  }
  showError(message) {
    this._snackBar.open(message, 'OK', {
      duration: 5000
    });
  }





  addShift() {
    let user = this.volunteers.find(user => user.username === this.myForm.controls.volunteer.value);
    if (user) {
      let data = {
        date: moment(this.myForm.controls.date.value).format('DD.MM'),
        time: this.myForm.controls.timeRange.value,
        user
      };
      this.appService.addShift(data).subscribe(data => {
        this.myForm.reset();
        this.router.navigate(['/schedule']);
      });
    } else {
      this.showError('Выберите волонтера из списка');
    }

  }

}
