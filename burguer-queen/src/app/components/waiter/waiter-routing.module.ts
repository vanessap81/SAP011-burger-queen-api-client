import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaiterComponent } from './waiter.component';
import { MenuComponent } from './menu/menu.component';
import { TablesComponent } from './tables/tables.component';
import { OrdersStatusComponent } from './orders-status/orders-status.component';

const routes: Routes = [
  {
    path: '',
    component:WaiterComponent,
    children: [
      {
        path: 'tables',
        component:TablesComponent
      },
      {
        path: 'menu',
        component:MenuComponent
      },
      {
        path: 'orders-status',
        component:OrdersStatusComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaiterRoutingModule { }
