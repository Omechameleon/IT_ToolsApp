import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../../login/login';
import { EditteacherprofilePage } from '../editteacherprofile/editteacherprofile';
import { AngularFireDatabase } from 'angularfire2/database';
import { TeacherchatselectionPage } from '../teacherchatselection/teacherchatselection';

@Component({
  selector: 'page-teacherhome',
  templateUrl: 'teacherhome.html',
  providers: [AngularFireAuth]
})
export class TeacherhomePage {

  public teacherProfileData = {};

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  { 
  }

  //Binnen ionViewDidLoad() halen we alle huidige data op voor de huidige user
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
          
          const personRef: firebase.database.Reference = firebase.database().ref(`/teacher/` + data.uid);
          personRef.on('value', personSnapshot => {
            this.teacherProfileData = personSnapshot.val();
          });
      }
    })
  }

  //Onderstaande code behelst uitloggen en het navigeren tussen pagina's

  signout()
  {
    this.afAuth.auth.signOut();
  }

  editProfile()
  {
    this.navCtrl.push(EditteacherprofilePage);
  }

  teacherchatselectionPage()
  {
    this.navCtrl.push(TeacherchatselectionPage);  
  }

}
