import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";
import { SignupPage } from '../signup/signup';
import { TeacherProfile } from "../../models/teacherProfile"


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  profile = {} as TeacherProfile;

  constructor( private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  saveProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object('profile/' + auth.uid).set(this.profile)
      .then(() => this.navCtrl.push('HomePage'));
    })
  }
}
