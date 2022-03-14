import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent implements OnInit {
  point;
  routePath;
  pointForm = new FormGroup({
    volNum: new FormControl({value: '', disabled: true}),
    external_vol: new FormControl({value: ''}),
    places: new FormControl(''),
    replaceTime: new FormControl({value: '', disabled: true}),
    comment: new FormControl('')
  });
  public volunteers = [];
  public needReplace = new FormControl(false);


  constructor(private appService: AppService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    const key = this.routePath = this.router.url.split('/').reverse()[0];
    this.appService.getPoint(key).subscribe(data => {
      this.point = data[0];
      this.pointForm.patchValue(data[0]);
      this.needReplace.patchValue(!!data[0].replaceTime);
      this.appService.getUsersOnPoint(this.point.key).subscribe(data => {
        this.volunteers = data;
      });
    });
    this.needReplace.valueChanges.subscribe(val => {
      if (val) {
        this.pointForm.controls.replaceTime.enable();
      } else {
        this.pointForm.controls.replaceTime.disable();
        this.pointForm.controls.replaceTime.patchValue('');
      }
    });
  }

  changeReplace() {

  }

  showError(message) {
    this._snackBar.open(message, 'OK', {
      duration: 5000
    });
  }

  savePoint() {
    this.appService.updatePoint(this.point.id, {
      ...this.pointForm.getRawValue(),
      external_vol: +this.pointForm.controls.external_vol.value
    }).subscribe(data => {
      this.showError('Сохранено');
    })
  }

}
