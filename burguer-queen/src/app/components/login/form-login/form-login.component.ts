import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})

export class FormLoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  @Output() sendData: EventEmitter<any> = new EventEmitter();
  
  constructor(){}

  ngOnInit(): void {
      
  }

  handleClick() {
    console.log(this.email);
    this.sendData.emit();
  }
}
