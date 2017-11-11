import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { EditprofilePage } from '../editprofile/editprofile';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { TeacherProfile } from './../../models/teacherProfile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  teacherProfileData: FirebaseObjectObservable<TeacherProfile>

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  {}

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid) {
        this.toastCtrl.create({
          message: 'Welkom' + data.email,
          duration: 3000
        }).present();

        this.teacherProfileData = this.afDatabase.object('profile/' + data.uid)

      }
      else{
        this.toastCtrl.create({
          message: 'Kon geen authenticatiedetails vinden',
          duration: 3000
        }).present();
      }
    })

  }


  teacherSignout()
  {
    this.afAuth.auth.signOut();
  }

  editProfile()
  {
    this.navCtrl.push(EditprofilePage);
  }

}
