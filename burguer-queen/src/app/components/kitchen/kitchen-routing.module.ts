import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitchenComponent } from './kitchen.component';
import { PrincipalComponent } from './principal/principal.component';
import { OrderStatusComponent } from './order-status/order-status.component';

const routes: Routes = [
  {
    path: '',
    component:KitchenComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalComponent,
      },
      {
        path: 'order-status',
        component: OrderStatusComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitchenRoutingModule { }
