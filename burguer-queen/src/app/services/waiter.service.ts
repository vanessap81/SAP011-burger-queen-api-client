import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ProductResponse } from '../interfaces/ProductResponse';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {
  private readonly apiUrlProducts = 'http://localhost:8080/products';
  private readonly apiUrlOrders = 'http://localhost:8080/orders';
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrlProducts, { headers });
  }

  getOrders(): Observable<any> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrlOrders, { headers });
  }
}

