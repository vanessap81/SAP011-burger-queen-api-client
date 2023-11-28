import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { WaiterService } from 'src/app/services/waiter.service';
import { OrderData } from 'src/app/interfaces/OrderData';
import { Ordermodel } from 'src/app/interfaces/OrderModel';
import { Products } from 'src/app/interfaces/Products';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
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
    products: []
  }; 


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
    this.order.client = this.orderData.name;
    this.infoFromTables.table = this.orderData.table;
  }
  
  getProductsList() {
    const userId: any = window.localStorage.getItem('userId');
    this.order.userId = userId;
    this._SERVICE.getProducts().subscribe({
      next: (data: ProductResponse[]) => {
        data.map(product => product.quantity = 0);
        this.breakfastProducts = data.filter((product: ProductResponse) => product.type == 'Café da manhã');
        this.todaysProducts = data.filter((product: ProductResponse) => product.type == 'Menu do dia');
      }
    })
  }

  back() {
    this.backToTables.emit();
  }

  removeProduct(event: Event, product: ProductResponse) {
    const target = event.target as HTMLInputElement;

    product.quantity--;
    if(this.order.products.length !== 0) {
      this.order.products.forEach(item => {
        if(item.productId === target.value && item.quantity > 0){
          item.quantity--;
          console.log('quantidade diminuida');
        } 
      })
    }

    let filtredProducts = this.order.products.filter(((item) => item.quantity > 0));
    this.order.products = filtredProducts;
    console.log(this.order.products);
  };

  itensInThisOrder = new Set();

  addProduct(event: Event, product: ProductResponse) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);

    console.log(this.itensInThisOrder);
    
    product.quantity++;

    if (this.order.products.length === 0) {
      this.order.products.push({productId: target.value, quantity: 1});
      this.itensInThisOrder.add(target.value);
    }
    else if (this.order.products.length > 0 && this.itensInThisOrder.has(target.value) === false) {
      this.order.products.push({productId: target.value, quantity: 1});
      this.itensInThisOrder.add(target.value);
    } 
    else if (this.order.products.length > 0 && this.itensInThisOrder.has(target.value) === true) {
      for (let i = 0; i < this.order.products.length; i++) {
        if (target.value === this.order.products[i].productId) {
          this.order.products[i].quantity++;
          break;
        }};
    } 
    
    console.log(this.order.products);
  }

}

// if(this.order.products.length > 0) {
//   for (let i = 0; i < this.order.products.length; i++) {
//     if (target.value !== this.order.products[i].productId) {
//       let productInclueded: Products = {productId: target.value, quantity: 0};
//       productInclueded.quantity++;
//       this.order.products.push(productInclueded);
//       console.log('novo produto incluido no pedido');
//     } 
    
//     if (target.value === this.order.products[i].productId) {
//       this.order.products[i].quantity++;
//       console.log('quantidade acrescida');
//     }
//   };
// } 

// else if(this.order.products.length === 0) {
//   let productInclueded: Products = {productId: target.value, quantity: 0};
//   productInclueded.quantity++;
//   this.order.products.push(productInclueded);
//   console.log('novo produto incluido no pedido');
// } 