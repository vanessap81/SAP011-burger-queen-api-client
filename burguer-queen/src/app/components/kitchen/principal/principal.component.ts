import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KitchenService } from 'src/app/services/kitchen/kitchen.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';
import { UpdatedOrder } from 'src/app/interfaces/UpdatedOrder';
import { UpdatedOrderResponse } from 'src/app/interfaces/UpdatedOrderResponse';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  orders: OrderResponse[] = [];
  selectedOrderData = 
    {
      _id: '',
      status: '',
      createdAt: '',
      updatedAt: ''
    };
  
  updatedStatus: UpdatedOrder = {
    userId: '',
    client: '',
    products: [],
    status: ''
  };

  @Output() toOrders = new EventEmitter();

  ngOnInit(): void {
    this.pullOrdersList();
  }

  constructor(
    private _kitchenService: KitchenService,
  ) {}

  select(order: OrderResponse): void {
    this.selectedOrderData._id = order._id;
    this.selectedOrderData.status = order.status;
    this.selectedOrderData.createdAt = order.createdAt.toString();
    this.selectedOrderData.updatedAt = order.updatedAt.toString();
    this.updatedStatus.client = order.client;
    this.updatedStatus.userId = order.userId;
    this.updatedStatus.products = order.products;
    // console.log(this.selectedOrderData);
  }

  acceptOrder(order: UpdatedOrder, id: string) {
    if (this.selectedOrderData.status === 'pending') {
      this.updatedStatus.status = 'delivering';
      this._kitchenService.updateOrderStatus(order, id).subscribe({
        next: (data: UpdatedOrderResponse) => {
          console.log(data);
        }
      })
    } else {
      console.log('O pedido já está em preparo');
    }
  }

  deliverOrder(order: UpdatedOrder, id: string) {
    if (this.selectedOrderData.status === 'delivering') {
      this.updatedStatus.status = 'delivered';
      this._kitchenService.updateOrderStatus(order, id).subscribe({
        next: (data: UpdatedOrderResponse) => {
          console.log(data);
        }
      })
    } else {
      console.log('O pedido precisa ser encaminhado para o preparo antes de ser marcaco como pronto');
    }
  }

  pullOrdersList() {
    this._kitchenService.getOrders().subscribe({
      next: (data: OrderResponse[]) => {
        this.orders = data.filter((order: OrderResponse) => order.status == 'pending' || order.status == 'delivering');
        // ordenar por hora
      }
    })
  }

  goToOdersStatus() {
    this.toOrders.emit();
  }
}
