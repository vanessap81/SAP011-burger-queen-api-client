import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { OrderData } from 'src/app/interfaces/OrderData';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  tableStatus: string = 'SEM PEDIDOS';
  selectedButton = {selected: false, tableNumber: ''};
  clienteName: string = '';
  isAllReady: boolean = false;
  tables = [
    {number: '01'}, 
    {number: '02'}, 
    {number: '03'}, 
    {number: '04'}, 
    {number: '05'}, 
    {number: '06'},
    {number: '07'}, 
    {number: '08'}, 
    {number: '09'}, 
    {number: '10'}, 
    {number: '11'}, 
    {number: '12'}
  ];

  orderData = {name: '', table: ''};

  // tableForm: FormGroup
  storage: Storage;

  @Output() clientNameAndTable = new EventEmitter<OrderData>();
  @Output() viewTablesStatus = new EventEmitter<any>();
  @Output() leaveWaiterSection = new EventEmitter<any>();

  OnInit() {
    
  }

  constructor(
    private _route: Router,
  ) {
    this.storage = window.localStorage;
    console.log('Você está na tela de Mesas');
  }
  
  checkTable(value: string) {
    this.selectedButton.selected = true;
    this.selectedButton.tableNumber = value;
    this.orderData.table = value;
  }

  prepareTable(event: Event) {
    const target = event.target as HTMLInputElement;
    this.clienteName = target.value;
    this.orderData.name = target.value;

    if(this.selectedButton.selected === true && this.tableStatus === 'SEM PEDIDOS' && this.clienteName !== '') {
      this.isAllReady = !this.isAllReady;
      console.log(this.clienteName, 'mesa', this.selectedButton.tableNumber, 'PRONTA');
    } else {
      this.isAllReady = false;
    }
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
