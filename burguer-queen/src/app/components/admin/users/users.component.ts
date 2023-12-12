import { Component, OnInit } from '@angular/core';
import { UsersResponse } from 'src/app/interfaces/UsersResponse';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersList: UsersResponse[] = [];

  ngOnInit(): void {
    this.getUsersList();
  }

  constructor(
    private _adminService: AdminService,
  ) {}

  getUsersList() {
    this._adminService.getUsers().subscribe({
      next: (data: UsersResponse[]) => {
        console.log(data);
        this.usersList = data;
      }
    })
  }
}
