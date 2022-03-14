import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AppService {

  public userInfo$ = new BehaviorSubject(null);
  public count$ = new BehaviorSubject(0);
  public wokPlace$ = new BehaviorSubject(true);
  public isLoggedIn = false;

  //public baseUrl = 'http://localhost:3001/';
  public baseUrl = '';
  constructor(
    public http: HttpClient
  ) {}


  public createUser(data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}api/users`, data);
  }

  public getUser(id): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/users/${id}`);
  }

  public getMainText(): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/mainText`);
  }

  public updatetMainText(id, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`${this.baseUrl}api/mainText/${id}`, data);
  }

  public getUsers(): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/users`);
  }

  public getUsersOnPoint(pointKey): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/users/key/${pointKey}`);
  }

  public getShifts(): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/shifts`);
  }

  public login(data): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}api/login`, data);
  }

  public getPoints(): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/points`);
  }

  public getCount(): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/count`);
  }

  public getPoint(key): Observable<any> {
    return this.http.get<HttpResponse<any>>(`${this.baseUrl}api/points/${key}`);
  }

  public updatePoint(id, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`${this.baseUrl}api/points/${id}`, data);
  }

  public addShift(data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`${this.baseUrl}api/shifts`, data);
  }

  public updateUser(id, data): Observable<any> {
    return this.http.put<HttpResponse<any>>(`${this.baseUrl}api/users/${id}`, data);
  }

  public deleteShift(id, params): Observable<any> {
    return this.http.delete<HttpResponse<any>>(`${this.baseUrl}api/shifts/${id}`, {params});
  }

}
