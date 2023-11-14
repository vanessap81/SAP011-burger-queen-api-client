import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/Login';
import { LoginResponse } from 'src/app/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data: string = '';

  ngOnInit(): void {}

  constructor(
    private _loginService: LoginService,
    private _storage: Storage
    ) {}

  async createHandler(form: Login) {
    console.log(form);
    this._loginService.login(form).subscribe({
      next: (data: LoginResponse) => {
        console.log(data);
      }
    });
  }
  
  set(key: string, value: string) {
    this._storage.setItem(key, value);
  }
}


// constructor(private loginService: LoginService) {}