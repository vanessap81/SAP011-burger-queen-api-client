import { Component, OnInit, EventEmitter, afterNextRender } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/interfaces/Login';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data?: string = '';
  storage: Storage;
  // errorLogin: boolean = false;

  ngOnInit(): void {}

  constructor(
    private _loginService: LoginService,
    private _route: Router
    ) {
      this.storage = window.localStorage;
    }

  async authentication(form: Login) {
    console.log(form);
    this._loginService.login(form).subscribe({
      next: (data: LoginResponse) => {
        this.storage.setItem('token', data.acessToken);
        const token = window.localStorage.getItem('token');
        const userRole = data.role;
        this._route.navigate([`/${userRole}`])
      }
    });
  }

}

