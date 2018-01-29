import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { MovementsServiceProvider } from '../../providers/movements-service/movements-service';

import { ShowPage } from '../show/show';
import { CreatePage } from '../create/create';

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})

export class ExpensesPage {

  public expenses;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movementsService: MovementsServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncomesPage');
  }

  ionViewWillEnter() {
    this.getExpenses();
  }

  showLoading() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  getExpenses(): void {

    this.showLoading();

    this.movementsService
      .getExpenses()
      .subscribe(expenses => this.expenses = expenses);

    this.hideLoading();
  }

  deleteExpense(id: string) {

    this.showLoading();

    this.movementsService
      .deleteMovement(id)
      .subscribe(response => this.getExpenses());

    this.hideLoading();
  }

  showMovement(id: string) {

    this.showLoading();

    this.movementsService
      .getMovement(id)
      .subscribe(response => {
        this.navCtrl.push(ShowPage, {
          'movement': response
        });
      });

    this.hideLoading();
  }

  editMovement(id: string) {

    this.showLoading();

    this.movementsService
      .getMovement(id)
      .subscribe(response => {
        this.navCtrl.push(CreatePage, {
          'movement': response
        });
      });

    this.hideLoading();
  }
}
