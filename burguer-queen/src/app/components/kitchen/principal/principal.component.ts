import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KitchenService } from 'src/app/services/kitchen/kitchen.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';
import { UpdatedOrder } from 'src/app/interfaces/UpdatedOrder';
import { UpdatedOrderResponse } from 'src/app/interfaces/UpdatedOrderResponse';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';


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
    status: '',
    table: ''
  };

  productsList: ProductResponse[] = [];

  @Output() toOrders = new EventEmitter();

  ngOnInit(): void {
    this.pullOrdersList();
    this.getProductsList();
  }

  constructor(
    private _kitchenService: KitchenService,
  ) {}

  select(order: OrderResponse): void {
    this.selectedOrderData._id = order._id;
    this.selectedOrderData.status = order.status;
    this.selectedOrderData.createdAt = new Date(order.createdAt).toLocaleString('pt-BR', {timeZone: 'UTC'});
    this.selectedOrderData.updatedAt = new Date(order.updatedAt).toLocaleString('pt-BR', {timeZone: 'UTC'});
    this.updatedStatus.client = order.client;
    this.updatedStatus.userId = order.userId;
    this.updatedStatus.products = order.products;
    // console.log(this.selectedOrderData);
  }

  acceptOrder(order: UpdatedOrder, id: string) {
    if (this.selectedOrderData.status === 'pending') {
      this.updatedStatus.status = 'preparing';
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
    if (this.selectedOrderData.status === 'preparing') {
      this.updatedStatus.status = 'delivering';
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
        console.log(data);

        this.orders = data.filter((order: OrderResponse) => order.status == 'pending' || order.status == 'preparing');
        this.orders.sort((a, b) => a.createdAt.localeCompare(b.createdAt) );
      }
    })
  }

  getProductsList() {
    this._kitchenService.getProducts().subscribe({
      next: (data: any) => {
        this.productsList = data;
        console.log(this.productsList);
      }
    })
  }

  timeSince() {
    let now = new Date().toLocaleString('pt-BR', {timeZone: 'UTC'});
    let since = this.selectedOrderData.updatedAt;
    // parse transforma data em milisegundos
    let nowParsed = Date.parse(now);
    let sinceParsed = Date.parse(since);
    console.log(now);
    console.log(since);
    // let timeInPrepare = new Date(nowParsed - sinceParsed);
  }

  goToOdersStatus() {
    this.toOrders.emit();
  }
}
