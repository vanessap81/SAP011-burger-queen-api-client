import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KitchenService } from 'src/app/services/kitchen/kitchen.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  orders: OrderResponse[] = [];
  selectedButton: string = '';

  @Output() toOrders = new EventEmitter();

  ngOnInit(): void {
    this.pullOrdersList();
  }

  constructor(
    private _kitchenService: KitchenService,
  ) {}

  select(id: string): void {
    this.selectedButton = id;
  }

  pullOrdersList() {
    this._kitchenService.getOrders().subscribe({
      next: (data: any) => {
        this.orders = data;
        console.log(data);
        // this.ordersByStatus = this.allOrdersList.filter((order: OrderResponse) => order.status == 'pending');
      }
    })
  }

  goToOdersStatus() {
    this.toOrders.emit();
  }
}
