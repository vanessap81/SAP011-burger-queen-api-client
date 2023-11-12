import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
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
  role: string = '';

  // @Input() email: string;

  loginForm!: FormGroup;

  @Output() sendData = new EventEmitter<string>();
  
  constructor(){
    this.email = '';
    this.password = '';
    this.role = '';

    this.loginForm = new FormGroup({
      email: new FormControl,
      password: new FormControl,
      role: new FormControl
    })
  }

  ngOnInit(): void {}

  // get emailForm() {
  //   return this.loginForm.get('email');
  // }

  chooseRole(e: Event) {
    const target = e.target as HTMLInputElement;
    this.role = target.value;
  }

  submit(): void {
    if(this.loginForm.invalid) {
      return
    };

    console.log(this.loginForm.value);
    console.log('Do submit: Enviou formulário');
  }

  handleClick(data: string) {
    this.sendData.emit(data);
  }
}
