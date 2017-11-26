import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { SchoolhomePage } from "../schoolhome/schoolhome";
/**
 * Generated class for the EditschoolprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editschoolprofile',
  templateUrl: 'editschoolprofile.html',
})
export class EditschoolprofilePage {

  constructor( private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditschoolprofilePage');
  }

  saveProfile(name: string, location: string){
    this.afAuth.authState.take(1).subscribe(auth => {
      const personRef: firebase.database.Reference = firebase.database().ref('/school/' + auth.uid);
      personRef.update({
        name,
        location,
      })
    })
  }

}
