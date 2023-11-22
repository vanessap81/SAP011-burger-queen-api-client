import { Component, OnInit, EventEmitter, afterNextRender } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
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

  ngOnInit(): void {}

  constructor(
    private _loginService: LoginService,
    private _route: Router
    ) {
      this.storage = window.localStorage;
    }

  async authentication(form: Login) {
    this._loginService.login(form).subscribe({
      next: (data: LoginResponse) => {
        this.storage.setItem('token', data.acessToken);
        const userRole = data.role;
        switch (userRole) {
          case 'waiter':
            return this._route.navigate(['/waiter/tables']);
          case 'kitchen':
            return this._route.navigate(['/kitchen']);
          case 'admin':
            return this._route.navigate(['/admin']);
          default:
            return this._route.parseUrl('');
        }
      }
    });
  }

}

