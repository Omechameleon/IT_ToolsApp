import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../../login/login';
import { EditschoolprofilePage } from '../editschoolprofile/editschoolprofile';
import { TeacherlistPage } from '../teacherlist/teacherlist';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { SchoolchatselectionPage } from '../schoolchatselection/schoolchatselection';


@IonicPage()
@Component({
  selector: 'page-schoolhome',
  templateUrl: 'schoolhome.html',
})
export class SchoolhomePage {

  public schoolProfileData = {};

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth) 
  {
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
          
        const personRef: firebase.database.Reference = firebase.database().ref(`/school/` + data.uid);
        personRef.on('value', personSnapshot => {
          this.schoolProfileData = personSnapshot.val();
        });
      }
    });
  }

  signout()
  {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  editProfile()
  {
    this.navCtrl.push(EditschoolprofilePage);
  }

  teacherlistPage()
  {
    this.navCtrl.push(TeacherlistPage);
  }

  schoolchatselectionPage()
  {
    this.navCtrl.push(SchoolchatselectionPage)
  }

}
