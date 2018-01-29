import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public loading: Loading;
  public credentials = {username: '', password: ''};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    }

  showLoading() {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  showError(text) {

    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });

    alert.present(prompt);
  }

  login() {

    this.showLoading();

    this.auth.login(this.credentials).subscribe(data => {

      if(data) {
        this.navCtrl.setRoot(MainPage);
      } else {
        this.showError('Invalid data.');
      }

    }, error => {
      this.showError(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
