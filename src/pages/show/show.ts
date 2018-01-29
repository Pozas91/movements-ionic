import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Movement } from '../../models/movement';

@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {

  private movement: Movement;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.movement = this.navParams.get('movement');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPage');
  }

  ionViewWillEnter() {
    console.info(this.movement);
  }

}
