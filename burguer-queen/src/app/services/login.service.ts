import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Login';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private readonly apiUrl = 'https://burger-queen-api-jade.vercel.app/login'

  constructor(private http: HttpClient) { }

  login(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
