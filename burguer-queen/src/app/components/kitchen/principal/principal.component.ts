import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  @Output() toOrders = new EventEmitter();

  ngOnInit(): void {
      
  }

  goToOdersStatus() {
    this.toOrders.emit();
  }
}
