import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ordermodel } from '../../interfaces/OrderModel';
import { OrderResponse } from '../../interfaces/OrderResponse';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {
  private readonly apiUrlProducts = 'https://burger-queen-api-jade.vercel.app/products';
  private readonly apiUrlOrders = 'https://burger-queen-api-jade.vercel.app/orders';
  private readonly apiUrlSendOrder = 'https://burger-queen-api-jade.vercel.app/orders';
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

  sendOrder(order: Ordermodel): Observable<OrderResponse> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<OrderResponse>(this.apiUrlSendOrder, order, { headers });
  }
}

