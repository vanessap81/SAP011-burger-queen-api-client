import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Login } from '../interfaces/Login';

import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

fdescribe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient;
  let form: Login

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar um POST com o endpoint correto', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    service.login(form);
    expect(spy).toHaveBeenCalled()
  })
});
