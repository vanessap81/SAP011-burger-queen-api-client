import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: ProductResponse[] = [];

  ngOnInit(): void {
    this.getProductsList();
  }

  constructor(
    private _adminService: AdminService,
  ) {}

  getProductsList() {
    this._adminService.getProducts().subscribe({
      next: (data: ProductResponse[]) => {
        console.log(data);
      }
    })
  }

  
}
