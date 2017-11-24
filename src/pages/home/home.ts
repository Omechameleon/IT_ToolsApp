import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { EditprofilePage } from '../editprofile/editprofile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';
import { TeacherhomePage } from '../teacherhome/teacherhome';
import { SchoolhomePage } from '../schoolhome/schoolhome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  public teacherProfileData = {TorS: ''};
  public schoolProfileData = {TorS: ''};
  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  {
    this.onReached();
  }


  redirect()
  {
    if(this.teacherProfileData != null)
    {
      this.navCtrl.setRoot(TeacherhomePage);
    }
    else if(this.schoolProfileData != null)
    {
      this.navCtrl.setRoot(SchoolhomePage);
    }
    else{
      this.toastCtrl.create(
        {
          message: "Alles KAPOT!!",
          duration: 5000
        })
        .present();
    }
  }

  onReached()
  {
    var check1 = 0;
    var check2 = 0;

    this.afAuth.authState.take(1).subscribe(data =>
    { 
      
      const personRef1: firebase.database.Reference = firebase.database().ref(`/teacher/` + data.uid);
      personRef1.on('value', personSnapshot => {
        this.teacherProfileData = personSnapshot.val();
        check1 = 1;
        if (check2 == 1) {
          this.redirect();
        }
      });
      
      const personRef2: firebase.database.Reference = firebase.database().ref(`/school/` + data.uid);
      personRef2.on('value', personSnapshot => {
        this.schoolProfileData = personSnapshot.val();
        check2 = 1;
        if (check1 == 1) {
          this.redirect();
        }
      });  
    });
  }
}
