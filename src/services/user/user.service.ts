import { inject, Injectable } from '@angular/core';
import { IUser } from '../../interfaces/interfaces';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { UserApiService } from '../user-api/user-api.service';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loaderService: LoaderService = inject(LoaderService);

  userApiService: UserApiService = inject(UserApiService);

  messagesService: MessagesService = inject(MessagesService);

  usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.usersSubject.asObservable();
  }

  loadUsers() {
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users) => {
        this.setUsers(users);
        this.messagesService.showSuccess('Пользователи успешно загружены');
      }),
      catchError(() => {
        this.messagesService.showError('Не удалось загрузить пользователей');
        this.setUsers([]);
        return of([]);
      }),
      finalize(() => this.loaderService.hideLoader()),
    );
  }
}
