import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-here-block',
  templateUrl: './here-block.component.html',
  styleUrls: ['./here-block.component.scss']
})
export class HereBlockComponent implements OnInit {
  checked = false;
  disabled = false;
  volontCount = 0;
  currentRoute;
  hereControl = new FormControl(false);

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.currentRoute = this.router.url.replace('/', '');
    if (this.currentRoute !== 'login') {

      this.appService.count$.subscribe(count => {
        this.volontCount = count;
      });
      const user = JSON.parse(window.localStorage.getItem('userInfo'));
      if (user) {
        this.appService.getUser(user.id).subscribe(user => {
          this.hereControl.patchValue(user.isHere);
        });
      }

      this.hereControl.valueChanges.subscribe(value => {
        this.appService.wokPlace$.next(value);
        if (value) {
          this.appService.updateUser(user.id, {isHere: value}).subscribe(data => {
            this.appService.getCount().subscribe(count => {
              this.volontCount = count;
            });
          });
        } else {
          this.appService.updateUser(user.id, {isHere: value, workPlace: null}).subscribe(data => {
            this.appService.userInfo$.next(data);
            this.appService.getCount().subscribe(count => {
              this.volontCount = count;
            });
          });
        }

      });
    }

  }

}
