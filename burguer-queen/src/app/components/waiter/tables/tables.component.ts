import { Component, EventEmitter, Output} from '@angular/core';

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

  @Output() clientNameAndTable = new EventEmitter<any>();

  OnInit() {}

  constructor() {}
  
  checkTable(value: string) {
    this.selectedButton.selected = true;
    this.selectedButton.tableNumber = value;
    console.log(this.selectedButton);
  }

  prepareTable(event: Event) {
    const target = event.target as HTMLInputElement;
    this.clienteName = target.value;
    console.log(this.clienteName);

    if(this.selectedButton.selected === true && this.tableStatus === 'SEM PEDIDOS' && this.clienteName !== '') {
      this.isAllReady = !this.isAllReady;
      console.log(this.clienteName, this.selectedButton.tableNumber, 'mesa pronta');
    } else {
      this.isAllReady = false;
    }
  }

  startOrder() {
    this.clientNameAndTable.emit(this.orderData);
    console.log('dados enviados')
  }
}
