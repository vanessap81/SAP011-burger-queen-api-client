import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  showOptions: boolean = true;
  showUsers: boolean = false;
  showProducts: boolean = false;

  ngOnInit(): void { }

  constructor(
    private _route: Router
  ) {
    // this.handleComponents(true, false, false);
  }
    
  handleComponents(showOptions: boolean, showUsers: boolean, showProducts: boolean) {
    this.showOptions = showOptions;
    this.showUsers = showUsers;
    this.showProducts = showProducts;
  }

  adminUsers() {
    this.handleComponents(false, true, false);
    this._route.navigate(['admin/users']);
  }

  adminProducts() {
    this.handleComponents(false, false, true);
    this._route.navigate(['admin/products']);
  }
}
