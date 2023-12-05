import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterComponent } from './waiter.component';
import { TablesComponent } from './tables/tables.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';
import { ConfirmComponent } from '../commons/confirm/confirm.component';


@NgModule({
  declarations: [
    WaiterComponent,
    TablesComponent,
    MenuComponent,
    OrdersStatusComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WaiterModule { }
