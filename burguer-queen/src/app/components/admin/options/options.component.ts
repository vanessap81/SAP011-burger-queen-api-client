import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  ngOnInit(): void {
      
  }

  @Output() adminUsers = new EventEmitter();
  @Output() adminProducts = new EventEmitter();

  toUsers() {
    this.adminUsers.emit();
  }

  toProducts() {
    this.adminProducts.emit();
  }
}
