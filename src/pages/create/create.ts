import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { MovementsServiceProvider } from '../../providers/movements-service/movements-service';

import { Movement } from '../../models/movement';
import { Item } from '../../models/item';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  private movement: Movement;
  private item: Item;
  private loading: Loading;
  private title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movementsService: MovementsServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

      this.movement = navParams.get('movement');
      this.clearItem();

      if(!this.movement) {

        this.clearMovement();
        this.title = 'Create';

      } else {

        this.title = 'Edit';
      }
    }

  addItem() {

    if(this.item.name != null && this.item.amount != null) {
      this.movement.items.push(this.item);
    }

    this.clearItem();
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

  showAlert(title: string, text: string) {

    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });

    alert.present(prompt);
  }

  createMovement() {

    this.showLoading();

    this.movementsService
      .createMovement(this.movement)
      .subscribe(response => {

        if(response) {

          this.showAlert("Success!", "Movement saved successfully.");
          this.clearMovement();

        } else {
          this.showAlert("Danger!", "Movement couldn't to save successfully.");
        }
      });
  }

  updateMovement() {

    this.showLoading();

    this.movementsService
      .updateMovement(this.movement)
      .subscribe(response => {

        if(response) {

          this.showAlert("Success!", "Movement updated successfully.");
          this.clearMovement();

        } else {
          this.showAlert("Danger!", "Movement couldn't to update successfully.");
        }
      })
  }

  doAction() {

    if(!this.movement._id) {

      this.createMovement();

    } else {

      this.updateMovement();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  clearItem() {
    this.item = new Item(null, null);
  }

  deleteItem(index) {
    this.movement.items.splice(index, 1);
  }

  clearMovement() {
    this.movement = new Movement(null, null, null, null, []);
  }

}
