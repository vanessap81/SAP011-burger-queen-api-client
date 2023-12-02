import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WaiterService } from 'src/app/services/waiter.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';
@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.component.html',
  styleUrls: ['./orders-status.component.css']
})
export class OrdersStatusComponent implements OnInit {

  statuses = [
    {button: 'aguardando aceite', status: 'pending'},
    {button: 'em preparo', status: 'delivering'},
    {button: 'entregues', status: 'delivered'},
    {button: 'cancelados', status: 'canceled'}
  ]

  selectedButton = '';
  allOrdersList: OrderResponse[] = [];
  ordersByStatus: OrderResponse[] = [];
  creationTime = '';
  updated = '';

  @Output() backToTables = new EventEmitter();

  constructor(
    private _waiterService: WaiterService,
  ) {}

  ngOnInit(): void {
    console.log('Você está na tela de Status');
    this.pullOrdersList();
  }

  pullOrdersList() {
    this._waiterService.getOrders().subscribe({
      next: (data: any) => {
        console.log(data);
        this.allOrdersList = data;
        this.ordersByStatus = this.allOrdersList.filter((order: OrderResponse) => order.status == 'pending');
      }
    })
  }

  select(status: string): void {
    this.selectedButton = status;
    this.ordersByStatus = this.allOrdersList.filter((order: OrderResponse) => order.status == status);
    // this.ordersByStatus.sort((a, b) => )
  }

  back() {
    this.backToTables.emit();
  } 

}

