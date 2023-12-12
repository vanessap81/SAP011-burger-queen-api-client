import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly apiUrlUsers = 'https://burger-queen-api-jade.vercel.app/users';
  private readonly apiUrlProducts = 'https://burger-queen-api-jade.vercel.app/products';
  storage: Storage;

  constructor(
    private http: HttpClient
  ) {
    this.storage = window.localStorage;
  }

  getUsers(): Observable<any> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrlUsers, { headers });
  }

  getProducts(): Observable<any> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrlProducts, { headers });
  }
}
