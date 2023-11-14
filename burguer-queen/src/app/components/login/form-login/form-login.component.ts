import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/interfaces/Login';
// import { Login } from 'src/app/Login';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})

export class FormLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  roles = ['admin', 'chef', 'waiter'];
  role: string = '';

  chooseRole(e: Event) {
    const target = e.target as HTMLInputElement;
    this.role = target.value;
  }

  loginForm!: FormGroup;

  @Output() onSubmit = new EventEmitter<Login>();
  
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

  submit(): void {
    if(this.loginForm.invalid) {
      console.log('Formulário inválido');
      return
    };

    this.onSubmit.emit(this.loginForm.value);
  }
}

  // get emailControl() {
  //   return this.loginForm.get('emailControl')!;
  // }