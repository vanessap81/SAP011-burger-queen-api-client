import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminModule } from './components/admin/admin.module';
import { LoginModule } from './components/login/login.module';
import { KitchenModule } from './components/kitchen/kitchen.module';
import { WaiterModule } from './components/waiter/waiter.module';
import { ConfirmComponent } from './components/commons/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    LoginModule,
    KitchenModule,
    WaiterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
