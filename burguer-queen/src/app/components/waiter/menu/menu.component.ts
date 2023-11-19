import { Component, OnInit, Input } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { WaiterService } from 'src/app/services/waiter.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  breakfastProducts: ProductResponse[] = [];
  todaysProducts: ProductResponse[] = [];
  quantity: number = 0;
  clientName: any;
  tableNumber: any;

  storage: Storage;

  @Input() orderData: any = '';

  constructor(
    private readonly _SERVICE: WaiterService
    ) {
      this.storage = window.localStorage;
    }

  ngOnInit(): void {
    this.getProductsList();
    this.clientName = window.localStorage.getItem('clientName');
    this.tableNumber = window.localStorage.getItem('tableNumber');
    // this.orderData;
  }
  

  getProductsList() {
    this._SERVICE.getProducts().subscribe({
      next: (data: any) => {
        this.breakfastProducts = data.filter((product: any) => product.type == 'Café da manhã');
        this.todaysProducts = data.filter((product: any) => product.type == 'Menu do dia');
        // console.log(this.todaysProducts[0].image);
        console.log(this.breakfastProducts);
        console.log(this.todaysProducts);
      }
    })
  }

  cleanClientData() {
    localStorage.removeItem('clientName');
    localStorage.removeItem('tableNumber');
  }
}

