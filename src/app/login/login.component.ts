import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../app.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registrForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(public appService: AppService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  showError(message) {
    this._snackBar.open(message, 'OK', {
      duration: 5000
    });
  }

  signUp() {
    if (!this.registrForm.invalid) {
      this.appService.createUser(this.registrForm.value).subscribe(data => {
        const loginObj = {
          username: data.username,
          password: this.registrForm.controls.password.value
        };
        this.appService.login(loginObj).subscribe(data => {
          window.localStorage.setItem('userInfo', JSON.stringify(data));
          this.appService.userInfo$.next(data);
          this.appService.isLoggedIn = true;
          this.registrForm.reset();
          this.router.navigate(['/home']);
        });
      }, error => {
        console.log(error);
        this.showError(error.error);
      })
    } else {
      this.showError('Заполните все обязательные поля');
    }
  }

  login() {
    if (!this.loginForm.invalid) {
      this.appService.login(this.loginForm.value).subscribe(data => {
        window.localStorage.setItem('userInfo', JSON.stringify(data));
        console.log(data);
        this.appService.userInfo$.next(data);
        this.appService.isLoggedIn = true;
        this.loginForm.reset();
        this.router.navigate(['/home']);
      }, error => this.showError('Неправильный логин или пароль'))
    } else {
      this.showError('Заполните все обязательные поля');
    }
  }

}
