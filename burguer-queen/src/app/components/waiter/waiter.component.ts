import { Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent {

  data = ''

  @Input() clientNameAndTable = new EventEmitter<any>();

  OnInit() {}

  constructor() {}

}
