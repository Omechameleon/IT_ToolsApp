import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  email = ""
  captcha = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public toastCtrl: ToastController) {
    this.captcha = "";
    this.makeid();
    console.log(this.captcha);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++){
      this.captcha += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.toastCtrl.create(
        {
          message: 'Er is een mail naar uw emailadres gestuurd.',
          duration: 6000
        })
        .present())
      .catch((error) => this.toastCtrl.create(
        {
          message: 'Deze gebruiker werd niet gevonden. Controleer uw emailadres',
          duration: 6000
        })
        .present());
  }
}
