import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { TopIconComponent } from './top-icon/top-icon.component';


@NgModule({
  declarations: [
    LoginComponent,
    FormLoginComponent,
    TopIconComponent
    // chamar component commons aqui
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }
