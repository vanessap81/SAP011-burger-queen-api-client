import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {

  showTables: boolean = true;
  showMenu: boolean = false;
  showOrders: boolean = false;
  orderData = {name: '', tableNumber: ''};

  ngOnInit(): void {}

  constructor() {}
  
  openMenu(event: {name: string, tableNumber: string}) {
    this.orderData = event;
    this.orderData.name = event.name;
    this.orderData.tableNumber = event.tableNumber;
    console.log('Enviado do componente pai o OrderData', this.orderData);
    this.handleComponents(false, true, false);
  }

  handleComponents(showTables: boolean, showMenu: boolean, showOrders: boolean) {
    this.showTables = showTables;
    this.showMenu = showMenu;
    this.showOrders = showOrders;
  }

  openStatus() {
    this.handleComponents(false, false, true);
  }

}
