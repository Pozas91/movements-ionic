import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Storage } from '@ionic/storage';

import { MessageServiceProvider } from '../message-service/message-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class User {
  id: string;
  token: string;

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }
}

@Injectable()
export class AuthServiceProvider {

  private url = 'https://npg-movements.herokuapp.com/api/v1/';
  private user: User;

  constructor(
    private http: HttpClient,
    private messageService: MessageServiceProvider,
    private storage: Storage) { this.loadUser(); }

  login(credentials) {
    return this.http.post(`${this.url}\login`, credentials, httpOptions).pipe(
      tap(response => {

        this.log(`Server login response received`);
        var user = new User(response['userId'], response['token']);
        this.auth(user);
      }),
      catchError(this.messageService.handleError<any>('Login error'))
    );
  }

  getUser(): User {
    return this.user;
  }

  public loadUser () {

    return this.storage.ready().then(() => {
      return this.storage.get('user').then(
        user => this.user = user,
        error => catchError(this.messageService.handleError<any>(error))
      )
    });
  }

  auth(user: User) {

    return this.storage.ready().then(() => {

      return this.storage.set('user', user).then(
        () => {return true},
        error => this.messageService.handleError<any>('Cannot save user')
      );
    });
  }

  isLogged() {
    return this.user != null && this.user.token != null;
  }

  logout() {

    return this.storage.ready().then(() => {

      return this.storage.set('user', null).then(
        () => {console.info('User logout successfully.'); this.user = null},
        error => console.info('Cannot logout user.')
      );
    });
  }

  /** Log a AuthService message with the MessageService */
  private log(message: string) {
    this.messageService.add('AuthService: ' + message);
  }
}
