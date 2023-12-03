import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdatedOrder } from 'src/app/interfaces/UpdatedOrder';
import { UpdatedOrderResponse } from 'src/app/interfaces/UpdatedOrderResponse';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  private readonly apiUrlOrders = 'https://burger-queen-api-jade.vercel.app/orders';
  private readonly apiUrlUpdateOrders = 'https://burger-queen-api-jade.vercel.app/orders';
  storage: Storage;

  constructor(
    private http: HttpClient
    ) { 
    this.storage = window.localStorage;
  }

  getOrders(): Observable<any> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.apiUrlOrders, { headers });
  }

  updateOrderStatus(order: UpdatedOrder, orderId: string): Observable<UpdatedOrderResponse> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<UpdatedOrderResponse>(`${this.apiUrlUpdateOrders}/${orderId}`, order, { headers });
  }
}
