import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterComponent } from './waiter.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';


@NgModule({
  declarations: [
    WaiterComponent,
    TablesComponent,
    MenuComponent,
    OrdersStatusComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ]
})
export class WaiterModule { }
