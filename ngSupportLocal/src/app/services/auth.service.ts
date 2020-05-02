import { environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(email, password) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(email, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };

    // create request to authenticate credentials
    return this.http.get<User>(this.baseUrl + 'authenticate', httpOptions).pipe(
      tap((res) => {
        localStorage.setItem('credentials', credentials);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.login(): Error logging in.');
      })
    );
  }

  register(user) {
    // create request to register a new account
    return this.http.post(this.baseUrl + 'register', user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('AuthService.register(): error registering user.');
      })
    );
  }

  logout() {
    localStorage.removeItem('credentials');
  }

  checkLogin() {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(email, password) {
    return btoa(`${email}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem('credentials');
  }

  getLoggedInEmail() {
    return localStorage.getItem('email');
  }
  getUserByEmail(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        // 'Content-Type': 'application/json',
        Authorization: `Basic ` + this.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      }),
    };
    return this.http
      .get<User>(this.baseUrl + 'api/users/' + email, httpOptions)
      .pipe(
        catchError((err: any) => {
          // console.log(err);
          return throwError('AuthService.register(): error registering user.');
        })
      );
  }
}
