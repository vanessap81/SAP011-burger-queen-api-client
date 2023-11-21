import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {
  private readonly apiUrl = 'http://localhost:8080/products';
  storage: Storage;
  
  constructor(
    private http: HttpClient
    ) { 
    this.storage = window.localStorage;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): Observable<any> {
    const token: any = window.localStorage.getItem('token');
    // console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrl, { headers });
  }
}

