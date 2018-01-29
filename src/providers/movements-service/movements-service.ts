import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { MessageServiceProvider } from '../message-service/message-service';

import { Movement } from '../../models/movement';

/*
Generated class for the MovementsServiceProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class MovementsServiceProvider {

  private url = 'https://npg-movements.herokuapp.com/api/v1/movements';

  constructor(
    private http: HttpClient,
    private messageService: MessageServiceProvider,
    private auth: AuthServiceProvider) { }

    getMovement(id: string) {
      return this.http.get(`${this.url}/${id}`, this.getHttpOptions()).pipe(
        catchError(this.messageService.handleError<any>('Get a movement error'))
      )
    }

    createMovement(movement: Movement) {
      return this.http.post(`${this.url}`, movement, this.getHttpOptions()).pipe(
        tap(response => this.log('Post movement response received.')),
        catchError(this.messageService.handleError<any>('Post movement error'))
      );
    }

    getIncomes() {
      return this.http.get(`${this.url}/incomes`, this.getHttpOptions()).pipe(
        tap(response => this.log('Get incomes response received.')),
        catchError(this.messageService.handleError<any>('Get incomes error'))
      );
    }

    deleteMovement(id: string) {
      return this.http.delete(`${this.url}/${id}`, this.getHttpOptions()).pipe(
        catchError(this.messageService.handleError<any>('Delete movement error'))
      )
    }

    updateMovement(movement: Movement) {
      return this.http.put(`${this.url}/${movement._id}`, movement, this.getHttpOptions()).pipe(
        catchError(this.messageService.handleError<any>('Update movement error'))
      )
    }

    getExpenses() {
      return this.http.get(`${this.url}/expenses`, this.getHttpOptions()).pipe(
        tap(response => this.log('Get expenses response received.')),
        catchError(this.messageService.handleError<any>('Get expenses error'))
      );
    }

    public getHttpOptions() {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-access-token': this.auth.getUser().token,
        })
      }
    }

    /** Log a MovementService message with the MessageService */
    private log(message: string) {
      this.messageService.add('MovementService: ' + message);
    }

  }
