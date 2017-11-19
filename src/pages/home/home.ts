import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { EditprofilePage } from '../editprofile/editprofile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  public teacherProfileData = {};

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  { /*this.afAuth.authState.take(1).subscribe(data => {
    this.teacherProfileData = this.afDatabase.list('/profile/' + data.uid).valueChanges();
    })*/
  }

  ionViewDidLoad(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.toastCtrl.create(
          {
            message: 'Welkom ' + data.email,
            duration: 3000
          })
          .present();
          const personRef: firebase.database.Reference = firebase.database().ref(`/profile/` + data.uid);
          personRef.on('value', personSnapshot => {
            this.teacherProfileData = personSnapshot.val();
          });
      }
    })
  }


  teacherSignout()
  {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  editProfile()
  {
    this.navCtrl.push(EditprofilePage);
  }

}
