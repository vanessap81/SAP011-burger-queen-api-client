import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

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
  tables = [{number: '01'}, {number: '02'}, {number: '03'}, {number: '04'}, {number: '05'}, {number: '06'},{number: '07'}, {number: '08'}, {number: '09'}, {number: '10'}, {number: '11'}, {number: '12'}];
  orderData = {name: '', tableNumber: ''};

  // tableForm: FormGroup
  storage: Storage;

  @Output() clientNameAndTable = new EventEmitter<any>();

  OnInit() {}

  constructor(
    private _route: Router,
  ) {
    this.storage = window.localStorage
  }
  
  checkTable(value: string) {
    this.selectedButton.selected = true;
    this.selectedButton.tableNumber = value;
    this.orderData.tableNumber = value;
  }

  prepareTable(event: Event) {
    const target = event.target as HTMLInputElement;
    this.clienteName = target.value;
    this.orderData.name = target.value;

    if(this.selectedButton.selected === true && this.tableStatus === 'SEM PEDIDOS' && this.clienteName !== '') {
      this.isAllReady = !this.isAllReady;
      console.log('Aviso do Tables', this.clienteName, this.selectedButton.tableNumber, 'mesa pronta');
    } else {
      this.isAllReady = false;
    }
  }

  startOrder() {
    this.clientNameAndTable.emit(this.orderData);
  }

  viewStatusOrders() {
    return this._route.navigate(['/orders-status']);
  }
}
