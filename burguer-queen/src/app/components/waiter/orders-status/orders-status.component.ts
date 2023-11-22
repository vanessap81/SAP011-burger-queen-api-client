import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WaiterService } from 'src/app/services/waiter.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';
@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.component.html',
  styleUrls: ['./orders-status.component.css']
})
export class OrdersStatusComponent implements OnInit {

  ordersList: OrderResponse[] = [];

  @Output() backToTables = new EventEmitter();

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
        this.ordersList = data;
        console.log(this.ordersList);
      }
    })
  }

  back() {
    this.backToTables.emit();
  }

}
