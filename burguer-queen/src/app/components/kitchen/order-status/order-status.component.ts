import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KitchenService } from 'src/app/services/kitchen/kitchen.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

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
    private _kitchenService: KitchenService,
  ) {}

  ngOnInit(): void {
    console.log('Você está na tela de Status');
    this.pullOrdersList();
  }

  pullOrdersList() {
    this._kitchenService.getOrders().subscribe({
      next: (data: any) => {
        this.allOrdersList = data;
        this.ordersByStatus = this.allOrdersList.filter((order: OrderResponse) => order.status == 'pending');
        this.ordersByStatus.sort((a, b) => a.createdAt.localeCompare(b.createdAt) );
      }
    })
  }

  select(status: string): void {
    this.selectedButton = status;
    this.ordersByStatus = this.allOrdersList.filter((order: OrderResponse) => order.status == status);
    this.ordersByStatus.sort((a, b) => a.createdAt.localeCompare(b.createdAt) );
  }

  back() {
    this.backToTables.emit();
  } 

}

