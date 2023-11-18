import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {

  tableStatus: string = 'SEM PEDIDOS';
  selectedButton: boolean = false;
  clienteName: string = '';
  isAllReady: boolean = false;
  tables = [{number: '01'}, {number: '02'}, {number: '03'}, {number: '04'}, {number: '05'}, {number: '06'},{number: '07'}, {number: '08'}, {number: '09'}, {number: '10'}, {number: '11'}, {number: '12'}]
  tableNumber: string = '';
  countingClicks: string[] = [];
  // tableForm: FormGroup

  OnInit() {}

  constructor() {

  }
  
  checkTable(value: string) {
    this.countingClicks.push(value);
    console.log(this.countingClicks);

    if(this.countingClicks.length % 2 === 1) {
      this.selectedButton = true;
      this.tableNumber = value;
      // adicionar classe selected para manter a cor branca
      console.log(this.selectedButton);
    }


  }

  prepareTable(event: Event) {
    const target = event.target as HTMLInputElement;
    this.clienteName = target.value;
    console.log(this.clienteName);

    if(this.selectedButton === true && this.tableStatus === 'SEM PEDIDOS' && this.clienteName !== '') {
      this.isAllReady = !this.isAllReady;
      console.log(this.clienteName, this.tableNumber, 'mesa pronta');
    } else {
      this.isAllReady = false;
    }
  }

  startOrder() {
    console.log('pedido iniciado')
  }
}
