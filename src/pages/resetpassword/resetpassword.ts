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

  //We declareren de variabelen email en captcha hier omdat we ze actief binnen de html pagina gebruiken
  email = ""
  captcha = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public toastCtrl: ToastController) {
    this.makeid();
  }

  ionViewDidLoad() {
  }

  //We maken een random code aan als een extra beveiligingsmaatregel
  makeid() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++){
      this.captcha += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }

  //Als er op de resetPassword knop wordt geduwd voeren we de feitelijke code voor het aanvragen van een nieuw paswoord uit
  //Dit wordt verder afgehandeld door een methode van AngularFireAuth van angularfire2/auth
  //Er wordt een mail gestuurd naar het ingegeven emailadres voor het veranderen van het paswoord
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
