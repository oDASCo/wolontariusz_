import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AppService} from "./app.service";
import {InfoDialogComponent} from "./shared/header/info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wolontariusz';
  currentRoute;
  userInfo;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private appService: AppService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.appService.getCount().subscribe(count => {
      this.appService.count$.next(count);
    });
    let user = this.appService.userInfo$.getValue() ? this.appService.userInfo$.getValue() : JSON.parse(window.localStorage.getItem('userInfo')) ;
    this.appService.getUser(user.id).subscribe(user => {
      this.userInfo = user;
    });
    this.appService.userInfo$.subscribe(data => {
      user = this.appService.userInfo$.getValue();
      if (user) {
        this.appService.getUser(user.id).subscribe(user => {
          this.userInfo = user;
        });
      }
    });

    if (JSON.parse(window.localStorage.getItem('userInfo')).token) {
      this.appService.isLoggedIn = true;
      this.router.navigate([`/home`])
    }
    this.activatedRoute.queryParams.subscribe(data => {
      data && Object.keys(data).length !== 0 ? this.router.navigate([`/${data.page}`]) : null;
    })
    this.router.events.subscribe(event =>
      {
        this.currentRoute = this.router.url.replace('/', '')
      });

  }
  logout() {
    window.localStorage.removeItem('userInfo');
    this.appService.userInfo$.next(null);
    this.appService.isLoggedIn = true;
    this.router.navigate(['/login']);
  }

  openInfo() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '100vw',
      height: '90vh',
      maxWidth: '96vw'
    });
  }
}
