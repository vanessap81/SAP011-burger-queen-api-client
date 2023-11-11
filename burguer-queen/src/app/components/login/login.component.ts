import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  ngOnInit(): void {
    this.bemVindo();
  }

  constructor(private loginService: LoginService) {}

  bemVindo() {
    console.log('OnInit do Login Component: Bem-vindo ao Angular!');
  }

  onSendData() {
    console.log("Enviado do componente pai")
  }
}
