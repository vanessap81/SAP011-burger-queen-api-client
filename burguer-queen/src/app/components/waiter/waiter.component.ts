import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WaiterService } from 'src/app/services/waiter.service';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {

  data?: any = '';
  productsList: ProductResponse[] = [];

  ngOnInit(): void {}

  constructor(private readonly _SERVICE: WaiterService) {
    this._SERVICE.getProducts().subscribe((data) => {
      this.productsList = data;
      console.log(this.productsList);
    })
  }
  
}
