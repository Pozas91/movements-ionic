import { Component } from '@angular/core';

import { IncomesPage } from '../incomes/incomes';
import { ExpensesPage } from '../expenses/expenses';
import { CreatePage } from '../create/create';

@Component({
  templateUrl: 'main.html'
})

export class MainPage {

  incomes = IncomesPage;
  expenses = ExpensesPage;
  create = CreatePage;

  constructor() {

  }
}
