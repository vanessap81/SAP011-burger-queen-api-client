import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { WaiterService } from 'src/app/services/waiter.service';
import { OrderData } from 'src/app/interfaces/OrderData';

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
  order = {name: '', table: ''};

  @Input() orderData?: OrderData;
  @Output() backToTables = new EventEmitter();

  constructor(
    private readonly _SERVICE: WaiterService
    ) {}

  ngOnInit(): void {
    this.getProductsList();
    // this.getOrder(this.orderData?);
  }
  
  getProductsList() {
    this._SERVICE.getProducts().subscribe({
      next: (data: any) => {
        this.breakfastProducts = data.filter((product: any) => product.type == 'Café da manhã');
        this.todaysProducts = data.filter((product: any) => product.type == 'Menu do dia');
      }
    })
  }

  back() {
    this.backToTables.emit();
  }


  // getOrder(send: OrderData) {
  //   console.log('Enviado de Menu');
  //   send.name = this.order.name;
  //   send.tableNumber = this.order.table;
  // }
}

