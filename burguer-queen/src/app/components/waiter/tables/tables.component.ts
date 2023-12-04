import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { WaiterService } from 'src/app/services/waiter/waiter.service';
import { OrderResponse } from 'src/app/interfaces/OrderResponse';
import { OrderData } from 'src/app/interfaces/OrderData';
import { TableModel } from 'src/app/interfaces/TableModel';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  selectedButton = {selected: false, tableNumber: '', number: 0, client: ''};
  ordersList: OrderResponse[] = [];

  tables: TableModel[] = [
    { table: '01', _id: '', client: '', status: 'pending'}, 
    { table: '02', _id: '', client: '', status: 'free'}, 
    { table: '03', _id: '', client: '', status: 'free'}, 
    { table: '04', _id: '', client: '', status: 'free'}, 
    { table: '05', _id: '', client: '', status: 'free'}, 
    { table: '06', _id: '', client: '', status: 'free'}, 
    { table: '07', _id: '', client: '', status: 'free'}, 
    { table: '08', _id: '', client: '', status: 'free'}, 
    { table: '09', _id: '', client: '', status: 'free'}, 
    { table: '10', _id: '', client: '', status: 'free'}, 
    { table: '11', _id: '', client: '', status: 'free'}, 
    { table: '12', _id: '', client: '', status: 'free'}, 
  ];

  orderData = {name: '', table: ''};

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
    })
  }

  checkTable(table: string) {
    this.selectedButton.selected = true;
    this.selectedButton.tableNumber = table;
    this.orderData.table = table;

    let tableNumber = parseInt(table);
    this.selectedButton.number = tableNumber;
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

  logout() {
    this.leaveWaiterSection.emit();
  }
}
