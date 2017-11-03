import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  email:string="pieterjan.defeyter@ucll.be";
  password:string="test!!";
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth:AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Normallogin(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
    .then((response)=>{

      this.navCtrl.push(HomePage);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  Normallogout(){

  }


}
