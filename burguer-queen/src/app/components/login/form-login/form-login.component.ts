import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from 'src/app/Login';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})

export class FormLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  roles = ['admin', 'kitchen', 'waiter'];
  selectedRole: string = '';

  loginData: Login = {
    email: this.email,
    password: this.password,
    role: this.selectedRole
  }

  @Output() sendData = new EventEmitter<Login>();
  
  constructor(){}

  ngOnInit(): void {
      
  }

  chooseRole(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.selectedRole = value;
    // console.log(value);
  }

  submit(): void {
    console.log('Enviou formulário')
  }

  handleClick() {
    // console.log(this.loginData);
    this.sendData.emit(this.loginData);
  }
}
