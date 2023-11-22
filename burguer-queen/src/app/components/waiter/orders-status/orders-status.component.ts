import { Component, OnInit } from '@angular/core';
import { WaiterService } from 'src/app/services/waiter.service';
@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.component.html',
  styleUrls: ['./orders-status.component.css']
})
export class OrdersStatusComponent implements OnInit {

  ordersList: [] = [];

  constructor(
    private _waiterService: WaiterService,
  ) {}

  ngOnInit(): void {
    console.log('Você está na tela de Status');
    this.showOrdersList();
  }

  showOrdersList() {
    this._waiterService.getOrders().subscribe({
      next: (data: any) => {
        console.log(data);
        // this.ordersList = data;
      }
    })
  }

}
