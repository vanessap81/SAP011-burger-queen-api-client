import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { WaiterService } from 'src/app/services/waiter/waiter.service';
import { OrderData } from 'src/app/interfaces/OrderData';
import { Ordermodel } from 'src/app/interfaces/OrderModel';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';

import {
  trigger,
  style,
  animate,
  transition } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    
    trigger('modal', [
      transition(':enter', [
        style({ top: -999 }),
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})
export class MenuComponent implements OnInit {

  breakfastProducts: ProductResponse[] = [];
  todaysProducts: ProductResponse[] = [];

  quantity: number = 0;
  clientName: string = '';
  clientTable: string = '';

  infoFromTables: OrderData = {name: '', table: ''};
  storage: Storage;

  order: Ordermodel = {
    userId: '',
    client: '',
    products: [],
    table: ''
  };

  showConfirmation: boolean = false;


  @Input() orderData: OrderData = {name: '', table: ''};
  @Output() backToTables = new EventEmitter();

  constructor(
    private readonly _SERVICE: WaiterService
    ) {
      this.storage = window.localStorage;
    }

  ngOnInit(): void {
    this.getProductsList();
    console.log('Você está na tela de Menu');
    this.infoFromTables.name = this.orderData.name;
    this.infoFromTables.table = this.orderData.table;
    this.order.client = this.orderData.name;
    this.order.table = this.orderData.table;

  }
  
  getProductsList() {
    const userId: any = window.localStorage.getItem('userId');
    this.order.userId = userId;
    this.order.table = this.infoFromTables.table;
    this._SERVICE.getProducts().subscribe({
      next: (data: ProductResponse[]) => {
        // console.log(data);
        data.map(product => product.quantity = 0);
        this.breakfastProducts = data.filter((product: ProductResponse) => product.type == 'Café da manhã');
        this.todaysProducts = data.filter((product: ProductResponse) => product.type == 'Menu do dia');
      }
    })
  }

  back() {
    this.backToTables.emit();
  }

  setOfIdProducts = new Set();
  sum = 0;

  addProduct(event: Event, product: ProductResponse, productPrice: number, productName: string) {
    const target = event.target as HTMLInputElement;

    product.quantity++;

    if (this.order.products.length === 0) {
      this.order.products.push({productId: target.value, quantity: 1, name: productName, price: productPrice});
      this.setOfIdProducts.add(target.value);
      this.sum = this.sum + productPrice;
    } else if (this.order.products.length > 0 && this.setOfIdProducts.has(target.value) === false) {
      this.order.products.push({productId: target.value, quantity: 1, name: productName, price: productPrice});
      this.setOfIdProducts.add(target.value);
      this.sum = this.sum + productPrice;
    } else if (this.order.products.length > 0 && this.setOfIdProducts.has(target.value) === true) {
      for (let i = 0; i < this.order.products.length; i++) {
        if (target.value === this.order.products[i].productId) {
          this.order.products[i].quantity++;
          break;
        }};
        this.sum = this.sum + productPrice;
    }
  }

  removeProduct(event: Event, product: ProductResponse, productPrice: number) {
    const target = event.target as HTMLInputElement;
    if (this.order.products.length > 0 && this.setOfIdProducts.has(target.value) === true) {
      this.order.products.forEach(item => {
        if (item.productId === target.value && item.quantity > 1){
          item.quantity--;
          product.quantity--;
          this.sum = this.sum - productPrice;
        } else if (item.productId === target.value && item.quantity === 1) {
          item.quantity--;
          product.quantity--;
          this.sum = this.sum - productPrice;
          this.setOfIdProducts.delete(target.value);
        }
      })
    }

    let filtredProducts = this.order.products.filter(((item) => item.quantity > 0));
    this.order.products = filtredProducts;
  };

  sendThisOrder() {
    this.showConfirmation = true;
  }

  confirmOrder(order: Ordermodel) {
    console.log('Pedido enviado');
    console.log(this.order);
    
    this._SERVICE.sendOrder(order).subscribe({
      next: (data: OrderResponse) => {
        console.log(data);
      }
    });

    this.showConfirmation = false;
    this.back()
  }

  cancelConfirmation() {
    this.showConfirmation = false;
  }
}
