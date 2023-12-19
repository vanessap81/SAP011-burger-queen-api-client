import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/interfaces/ProductResponse';
import { AdminService } from 'src/app/services/admin/admin.service';
import {
  trigger,
  style,
  animate,
  transition } from '@angular/animations';
import { DeleteProductResponse } from 'src/app/interfaces/deleteProductResponse';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    
    trigger('modal', [
      transition(':enter', [
        style({ top: -999 }),
        animate('500ms', style({ top: '50%' })),
      ]),
      transition(':leave', [
        animate('250ms', style({ top: -999 }))
      ])
    ]),
  ]
})
export class ProductsComponent implements OnInit {

  productsList: ProductResponse[] = [];
  selectedProducts: ProductResponse[] = [];
  productDetails: boolean = false;
  productDelete: boolean = false;
  selectedProductDetails: ProductResponse = {
    _id: '',
    name: '',
    price: 0,
    image: '',
    type: '',
    createdAt: '',
    updatedAt: '',
    __v: 0,
    quantity: 0
  };

  selectedproductId: string = '';

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
  
  showDetails(productId: string) {
    this.productDetails = true;
    this._adminService.getDetails(productId).subscribe({
      next: (data: ProductResponse) => {
        this.selectedProductDetails = data;
        console.log(this.selectedProductDetails);
      }
    })
  }

  closeModal() {
    this.productDetails = false;
  }

  showProductDelete(productId: string) {
    this.productDelete = true;
    this.selectedproductId = productId;
  }

  cancelProductDelete() {
    this.productDelete = false;
  }

  delete() {
    this._adminService.deleteProduct(this.selectedproductId).subscribe({
      next: (data: DeleteProductResponse) => {
        console.log(data.message);
      }
    })
  }

}
