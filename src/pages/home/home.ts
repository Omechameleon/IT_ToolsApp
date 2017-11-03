import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from "../login/login";








@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  Normallogout(){
      }

}
