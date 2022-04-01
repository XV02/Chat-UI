import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      console.log('response ', response);
      this.users = response;
    })
  }

}
