import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OptionsComponent } from './options/options.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    AdminComponent,
    OptionsComponent,
    UsersComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
