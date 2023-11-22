import { Component, OnInit } from '@angular/core';
import { OrderData } from 'src/app/interfaces/OrderData';
import { Router } from '@angular/router';

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

  constructor(
    private _route: Router
  ) {}
  
  handleComponents(showTables: boolean, showMenu: boolean, showOrders: boolean) {
    this.showTables = showTables;
    this.showMenu = showMenu;
    this.showOrders = showOrders;
  }

  openMenu(event: OrderData) {
    this.orderData = event;
    this.orderData.name = event.name;
    this.orderData.tableNumber = event.tableNumber;
    console.log('Enviado do componente pai o OrderData', this.orderData);
    this.handleComponents(false, true, false);
    this._route.navigate(['waiter/menu']);
  }

  openStatus() {
    this.handleComponents(false, false, true);
    this._route.navigate(['waiter/orders-status']);
  }

  openTables() {
    this.handleComponents(true, false, false);
    this._route.navigate(['waiter/tables']);
  }

}
