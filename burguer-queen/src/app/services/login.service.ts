import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Login';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly apiUrl = 'http://localhost:8080/login';


  constructor(private http: HttpClient) { }

  login(form: Login): Observable<Login> {
    console.log(form);
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.http.post<Login>(this.apiUrl, form, { 'headers': headers });
    // .then para manipular a response
  }
}
