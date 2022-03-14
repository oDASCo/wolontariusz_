import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "./info-dialog/info-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo;
  constructor(private appService: AppService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.appService.userInfo$.subscribe(user => {
      this.userInfo = user;
    })
  }


  openInfo() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '100vw',
      height: '90vh',
      maxWidth: '96vw'
    });
  }


}
