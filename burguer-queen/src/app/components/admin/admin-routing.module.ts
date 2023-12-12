import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OptionsComponent } from './options/options.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component:AdminComponent,
    children: [
      {
        path: 'options',
        component:OptionsComponent
      },
      {
        path: 'users',
        component:UsersComponent
      },
      {
        path: 'products',
        component:ProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
