import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.getUsers();

  ngOnInit() {
    this.userService.loadUsers().subscribe();
  }
}
