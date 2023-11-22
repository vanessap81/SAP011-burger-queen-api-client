import { Component, OnInit, Input, Output } from '@angular/core';
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

  @Input() orderData: OrderData = {
    name: '',
    tableNumber: ''
  };

  constructor(
    private readonly _SERVICE: WaiterService
    ) {}

  ngOnInit(): void {
    this.getProductsList();
  }
  
  getProductsList() {
    this._SERVICE.getProducts().subscribe({
      next: (data: any) => {
        this.breakfastProducts = data.filter((product: any) => product.type == 'Café da manhã');
        this.todaysProducts = data.filter((product: any) => product.type == 'Menu do dia');
      }
    })
  }

  getOrder(event: OrderData) {
    event.name = this.clientName;
    event.tableNumber = this.clientTable;
    console.log('Enviado de Menu');
    console.log(this.clientName);
    console.log(this.clientTable);
  }
}

