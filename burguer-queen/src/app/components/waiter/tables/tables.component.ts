import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { WaiterService } from 'src/app/services/waiter/waiter.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';
import { OrderData } from 'src/app/interfaces/OrderData';
import { TableModel } from 'src/app/interfaces/TableModel';
import { UpdatedOrder } from 'src/app/interfaces/UpdatedOrder';
import { UpdatedOrderResponse } from 'src/app/interfaces/UpdatedOrderResponse';

import {
  trigger,
  style,
  animate,
  transition } from '@angular/animations';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    
    trigger('modal', [
      transition(':enter', [
        style({ top: -999 }),
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})

export class TablesComponent {

  selectedButton = {selected: false, tableNumber: '', number: 0, client: '', id: ''};
  ordersList: OrderResponse[] = [];

  tableIndex = this.selectedButton.number - 1;

  tables: TableModel[] = [
    { table: '01', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '02', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '03', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '04', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '05', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '06', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '07', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '08', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '09', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '10', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '11', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
    { table: '12', _id: '', userId: '', client: '', status: 'free', products: [], updatedAt: ''}, 
  ];

  orderData = {name: '', table: ''};
  showConfirmation: boolean = false;

  updatedStatus: UpdatedOrder = {
    userId: '',
    client: '',
    products: [],
    status: '',
    table: ''
  };


  storage: Storage;

  @Output() clientNameAndTable = new EventEmitter<OrderData>();
  @Output() viewTablesStatus = new EventEmitter<any>();
  @Output() leaveWaiterSection = new EventEmitter<any>();

  OnInit(): void {}

  constructor(
    private _route: Router,
    private _waiterService: WaiterService,
  ) {
    this.storage = window.localStorage;
    console.log('Você está na tela de Mesas');
    this.pullOrdersList();
  }
  
  pullOrdersList() {
    this._waiterService.getOrders().subscribe({
      next: (data: OrderResponse[]) => {
        console.log(data);
        this.ordersList = data;
      }
    });
  }

  checkTable(table: string) {

    this.selectedButton.selected = true;
    this.selectedButton.tableNumber = table;
    this.orderData.table = table;
    let tableNumber = parseInt(table);
    this.selectedButton.number = tableNumber;

    for (let i = 0; i < this.ordersList.length; i++) {
      if (this.ordersList[i].table === table) {
        this.tables[tableNumber - 1]._id = this.ordersList[i]._id;
        this.tables[tableNumber - 1].status = this.ordersList[i].status;
        this.tables[tableNumber - 1].client = this.ordersList[i].client;
        this.tables[tableNumber - 1].updatedAt = new Date(this.ordersList[i].updatedAt).toLocaleString('pt-BR', {timeZone: 'UTC'});
        this.tables[tableNumber - 1].userId = this.ordersList[i].userId;
        this.tables[tableNumber - 1].products = this.ordersList[i].products;
        this.selectedButton.id = this.ordersList[i]._id;
        console.log(this.tables[tableNumber - 1]);
      }
    }

    this.updatedStatus.client = this.tables[tableNumber - 1].client;
    this.updatedStatus.userId = this.tables[tableNumber - 1].userId;
    this.updatedStatus.products = this.tables[tableNumber - 1].products;
    this.updatedStatus.status = this.tables[tableNumber - 1].status;
    this.updatedStatus.table = this.tables[tableNumber - 1].table;
    console.log(this.updatedStatus);
  }

  prepareTable(event: Event) {
    const target = event.target as HTMLInputElement;
    this.orderData.name = target.value;
    this.selectedButton.client = target.value;

    let tableNumber = this.selectedButton.number;
    this.tables[tableNumber - 1].client = target.value;
  }

  startOrder() {
    this.clientNameAndTable.emit(this.orderData);
  }

  viewStatusOrders() {
    this.viewTablesStatus.emit();
  }

  deliverButton() {
    this.showConfirmation = true;
  }

  cancelConfirmation() {
    this.showConfirmation = false;
  }

  deliverOrder(order: UpdatedOrder, orderId: string) {
    if (this.tables[this.selectedButton.number - 1].status === 'delivering') {
      this.updatedStatus.status = 'delivered';
      this._waiterService.updateOrderStatus(order, orderId).subscribe({
        next: (data: UpdatedOrderResponse) => {
          console.log(data);
        }
      });
      this.showConfirmation = false;
    }
  }

  logout() {
    this.leaveWaiterSection.emit();
  }
}
