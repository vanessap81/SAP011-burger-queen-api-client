import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  // data = {};

  ngOnInit(): void {}

  constructor(private loginService: LoginService) {}


  onSendData() {
    console.log('Emitido do componente pai');
  }
}
