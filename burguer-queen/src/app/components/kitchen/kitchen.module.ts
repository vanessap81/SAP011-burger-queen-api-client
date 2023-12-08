import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitchenRoutingModule } from './kitchen-routing.module';
import { KitchenComponent } from './kitchen.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
    KitchenComponent,
    OrderStatusComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule
  ]
})
export class KitchenModule { }
