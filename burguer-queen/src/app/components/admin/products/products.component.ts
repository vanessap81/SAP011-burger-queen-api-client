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
  selectedProducts: ProductResponse[] = [];

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
        this.productsList = data;
      }
    })
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this._adminService.getProducts().subscribe({
      next: (data: ProductResponse[]) => {
        this.selectedProducts = data;
      }
    })

    this.productsList = this.selectedProducts.filter((product) => {
      return product.name.toLowerCase().includes(value);
    })
  }
  
}
