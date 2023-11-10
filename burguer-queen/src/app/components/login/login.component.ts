import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.bemVindo();
  }

  bemVindo() {
    console.log('OnInit do Login Component: Bem-vindo ao Angular!');
  }
}
