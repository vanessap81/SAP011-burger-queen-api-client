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

  @Input() orderData = {name: '', tableNumber: ''};

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

}

