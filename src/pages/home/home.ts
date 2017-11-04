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

  constructor(private navCtrl: NavController, private auth: AngularFireAuth)
  {

  }


  teacherSignout()
  {
    this.auth.auth.signOut();
  }

}
