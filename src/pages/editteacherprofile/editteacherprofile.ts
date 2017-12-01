import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { TeacherhomePage } from "../teacherhome/teacherhome";
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
  selector: 'page-editteacherprofile',
  templateUrl: 'editteacherprofile.html',
})
export class EditteacherprofilePage {

  public teacherProfileData = {};

  constructor( private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.uid)
      {
        const personRef: firebase.database.Reference = firebase.database().ref(`/teacher/` + data.uid);
        personRef.on('value', personSnapshot => {
          this.teacherProfileData = personSnapshot.val();
          console.log(this.teacherProfileData);
        });
      }
    })
  }



  saveProfile(name: string, age: string, location: string, classes: string, experience: string, about: string){
    this.afAuth.authState.take(1).subscribe(auth => {
      const personRef: firebase.database.Reference = firebase.database().ref('/teacher/' + auth.uid);
      personRef.update({
        name,
        age,
        location,
        classes,
        experience,
        about
      });
    })
  }
}
