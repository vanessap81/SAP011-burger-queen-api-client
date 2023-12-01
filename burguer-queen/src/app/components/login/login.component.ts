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
  hasError: boolean = false;
  errorMessage: string = '';

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
        this.hasError = false;
        this.errorMessage = '';
        console.log(data);
        this.storage.setItem('token', data.acessToken);
        this.storage.setItem('userId', data.userId);
        const userRole = data.role;
        switch (userRole) {
          case 'waiter':
            return this._route.navigate(['/waiter']);
          case 'chef':
            return this._route.navigate(['/kitchen']);
          case 'admin':
            return this._route.navigate(['/admin']);
          default:
            return this._route.parseUrl('');
        }
      },
      error: (error) => {
        this.hasError = true;
        switch(error.status) {
          case 0:
            this.errorMessage = 'O servidor não está disponível';
            break;
          case 401:
            this.errorMessage = 'Usuário ou senha incorretos';
            break;
        };
        switch(error.error.message) {
          case 'Invalid password':
            this.errorMessage = 'Senha inválida';
            break;
          case 'Invalid role':
            this.errorMessage = 'Função inválida';
            break;
          case 'Not found':
            this.errorMessage = 'Usuário não cadastrado';
            break;
        }
        console.error(error)
      }
    });
  }

}

