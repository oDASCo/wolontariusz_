import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AppService} from "../app.service";
import {InfoDialogComponent} from "../shared/header/info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TextDialogComponent} from "./text-dialog/text-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pointControl = new FormControl('free');
  mainText = null;
  user;
  replacePoints = [];

  constructor(private appService: AppService, public dialog: MatDialog) { }

  ngOnInit() {
    const user = JSON.parse(window.localStorage.getItem('userInfo'));
    if (user) {
      this.appService.getUser(user.id).subscribe(user => {
        this.user = user;
        user ? this.pointControl.patchValue(user.workPlace) : null;
        if (user && !user.isHere) {
          this.pointControl.patchValue(null);
        }
      });
    }
    this.appService.getMainText().subscribe(data => {
      this.mainText = data;
    })
    this.appService.wokPlace$.subscribe(val => {
      if (!val) {
        this.pointControl.disable();
      } else {
        this.pointControl.enable();
      }
    });
    this.pointControl.valueChanges.subscribe(value => {
      this.appService.updateUser(user.id, {workPlace: value}).subscribe(data => {

      });
    });
    this.appService.getPoints().subscribe(data => {
      this.replacePoints = data.filter(item => !!item.replaceTime);
    });
  }

  changeText() {
    const dialogRef = this.dialog.open(TextDialogComponent, {
      width: '100vw',
      height: '90vh',
      maxWidth: '96vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appService.getMainText().subscribe(data => {
        this.mainText = data;
      })
    });
  }

}
