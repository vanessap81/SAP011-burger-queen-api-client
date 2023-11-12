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

  // loginData: Login = {
  //   email: this.email,
  //   password: this.password,
  //   role: this.selectedRole
  // }

  @Output() sendData: EventEmitter<any> = new EventEmitter();
  
  constructor(){}

  ngOnInit(): void {
      
  }

  chooseRole(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.selectedRole = value;
    // console.log(this.selectedRole);
  }

  submit(): void {
    console.log('Do submit', this.email, this.password, this.selectedRole);
    console.log('Do submit: Enviou formulário')
  }

  handleClick() {

    this.sendData.emit();
  }
}
