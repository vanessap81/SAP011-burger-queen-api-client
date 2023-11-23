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
  private readonly generalApi = 'https://burger-queen-api-jade.vercel.app/';
  private readonly apiUrl = 'https://burger-queen-api-jade.vercel.app/login';

  constructor( private http: HttpClient ) { }

  login(form: Login): Observable<LoginResponse> {
    // console.log(form);
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.http.post<LoginResponse>(this.apiUrl, form, { 'headers': headers });
  }

}
