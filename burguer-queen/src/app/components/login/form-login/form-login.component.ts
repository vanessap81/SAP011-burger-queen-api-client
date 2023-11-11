import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  loginForm!: FormGroup;

  @Output() sendData = new EventEmitter<Login>();
  
  constructor(){}

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        emailControl: new FormControl('', [Validators.required]),
        passwordControl: new FormControl('', [Validators.required]),
        roleControl: new FormControl('', [Validators.required])
      })
  }

  chooseRole(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.selectedRole = value;
    // console.log(value);
  }

  get emailControl() {
    return this.loginForm.get('emailControl')!;
  }

  get passwordControl() {
    return this.loginForm.get('passwordControl')!;
  }

  get roleControl() {
    return this.loginForm.get('roleControl')!;
  }

  submit(): void {
    if(this.loginForm.invalid) {
      return
    };

    
    console.log('Enviou formulário')
  }

  handleClick() {
    console.log(this.loginData);
    this.sendData.emit(this.loginData);
  }
}
