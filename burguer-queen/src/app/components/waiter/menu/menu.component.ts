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

  order: Ordermodel = {
    userId: '',
    client: '',
    products: []
  }; 


  @Input() orderData: OrderData = {name: '', table: ''};
  @Output() backToTables = new EventEmitter();

  constructor(
    private readonly _SERVICE: WaiterService
    ) {}

  ngOnInit(): void {
    this.getProductsList();
    console.log('Você está na tela de Menu');
    this.infoFromTables.name = this.orderData.name;
    this.order.client = this.orderData.name;
    this.infoFromTables.table = this.orderData.table;
  }
  
  getProductsList() {
    this._SERVICE.getProducts().subscribe({
      next: (data: ProductResponse[]) => {
        console.log(data);
        this.breakfastProducts = data.filter((product: ProductResponse) => product.type == 'Café da manhã');
        this.todaysProducts = data.filter((product: ProductResponse) => product.type == 'Menu do dia');
      }
    })
  }

  back() {
    this.backToTables.emit();
  }

  removeProduct(event: Event) {
    const target = event.target as HTMLInputElement;

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
    console.log(this.order);

  };

  addProduct(event: Event) {
    const target = event.target as HTMLInputElement;

    if(this.order.products.length === 0) {
      let productInclueded: Products = {productId: target.value, quantity: 0};
      productInclueded.quantity++;
      this.order.products.push(productInclueded);
      console.log('novo produto incluido no pedido');
    } else {
      this.order.products.forEach(item => {
        if(item.productId === target.value){
          item.quantity++;
          console.log('quantidade acrescida');
        } else if(item.productId !== target.value) {
          let productInclueded: Products = {productId: target.value, quantity: 0};
          productInclueded.quantity++;
          this.order.products.push(productInclueded);
          console.log('novo produto incluido no pedido');
        }
      });
    }
    console.log(this.order);
  }

}

// else if(item.productId === target.value && item.quantity === 0){
//   this.order.products.;
// }