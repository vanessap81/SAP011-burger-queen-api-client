import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/interfaces/Login';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data: string = '';
  storage: Storage;

  ngOnInit(): void {}

  constructor(
    private _loginService: LoginService
    ) {
      this.storage = window.localStorage;
    }

  async createHandler(form: Login) {
    this._loginService.login(form).subscribe({
      next: (data: LoginResponse) => {
        console.log(data);
        this.storage.setItem('token', data.acessToken)
      }
    });
  }
}
