import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  showPrincipal: boolean = true;
  showOrderStatus: boolean = false;

  ngOnInit(): void {}

  constructor(
    private _activated: ActivatedRoute,
    private _route: Router
  ) {
    this.handleComponents(true, false);
  }

  handleComponents(showPrincipal: boolean, showOrders: boolean) {
    this.showPrincipal = showPrincipal;
    this.showOrderStatus = showOrders;
  }

  goToOrdersStatus() {
    this.handleComponents(false, true);
    this._route.navigate([
      'kitchen',
      'order-status'
    ]);
  }

  goToPrincipal() {
    this.handleComponents(true, false);
    this._route.navigate(['kitchen']);
  }
}
