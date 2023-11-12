import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  data: string = '';

  ngOnInit(): void {}

  constructor(private loginService: LoginService) {}

  async createHandler(form: Login) {
    const formData = new FormData();

    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("role", form.role);

    console.log(form);

    this.loginService.login(formData).subscribe();
  }

  
}


// constructor(private loginService: LoginService) {}