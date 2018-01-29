import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { MovementsServiceProvider } from '../../providers/movements-service/movements-service';

import { ShowPage } from '../show/show';
import { CreatePage } from '../create/create';

@IonicPage()
@Component({
  selector: 'page-incomes',
  templateUrl: 'incomes.html',
})

export class IncomesPage {

  public incomes;
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
      this.getIncomes();
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

    getIncomes(): void {

      this.showLoading();

      this.movementsService
      .getIncomes()
      .subscribe(incomes => this.incomes = incomes);

      this.hideLoading();
    }

    deleteIncome(id: string) {

      this.showLoading();

      this.movementsService
        .deleteMovement(id)
        .subscribe(response => this.getIncomes());

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
