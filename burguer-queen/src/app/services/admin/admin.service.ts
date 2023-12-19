import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { UsersResponse } from 'src/app/interfaces/UsersResponse';
import { DeleteProductResponse } from 'src/app/interfaces/deleteProductResponse';



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

  getUsers(): Observable<UsersResponse[]> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<UsersResponse[]>(this.apiUrlUsers, { headers });
  }

  getProducts(): Observable<ProductResponse[]> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<ProductResponse[]>(this.apiUrlProducts, { headers });
  }

  getDetails(productId: string): Observable<ProductResponse> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<ProductResponse>(`${this.apiUrlProducts}/${productId}`, { headers });
  }

  deleteProduct(productId: string): Observable<DeleteProductResponse> {
    const token: any = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<DeleteProductResponse>(`${this.apiUrlProducts}/${productId}`, { headers });
  }
}
