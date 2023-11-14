import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Login } from '../interfaces/Login';
import { HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly apiUrl = 'http://localhost:8080/login';

  constructor( private http: HttpClient ) { }

  login(form: Login): Observable<LoginResponse> {
    console.log(form);
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.http.post<LoginResponse>(this.apiUrl, form, { 'headers': headers });
    // .then para manipular a response
  }

  // set(key: string, value: any): boolean {
  //   if (this._storage) {
  //     this._storage.setItem(key, JSON.stringify(value));
  //     return true;
  //   }
  //   return false;
  // }
}
