import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };

  profileData = {
    name: 'Je voornaam & naam',
    age: 'Je leeftijd',
    location: 'Je woonplaats',
    classes: 'De vakken die je geeft',
    experience: 'Je eerdere werkervaring',
    about: 'Over jezelf',
    TorS: ''
  };

  torsData = {
    teacherBranch : "/teacher/",
    schoolBranch : "/school/"
  };

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController) {
    this.signupData.email = this.navParams.get('email');
  }

  signup() {
    if(this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Foutmelding',
        message: 'De ingegeven wachtwoorden komen niet overeen!',
	      buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
        .then(auth => {

          if(this.profileData.TorS == "teacher"){
          this.saveProfile(this.profileData.name, this.profileData.age, this.profileData.location, this.profileData.classes, this.profileData.experience, this.profileData.about, this.profileData.TorS, auth.uid, this.torsData.teacherBranch);
        }
        else if(this.profileData.TorS == "school"){
          this.saveProfile(this.profileData.name, this.profileData.age, this.profileData.location, this.profileData.classes, this.profileData.experience, this.profileData.about, this.profileData.TorS, auth.uid, this.torsData.schoolBranch);
        }
      })
        .catch(err => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            message: err.message,
            buttons: ['OK']
          });
          alert.present();
        });

          this.afAuth.auth.signInWithEmailAndPassword(this.signupData.email, this.signupData.password)
          .then(auth =>{
          })
          .catch(err =>{
            let toast = this.toastCtrl.create({
              message: err.message,
              duration: 5000
            });
            toast.present();
          });
      }



      saveProfile(name: string, age: string, location: string, classes: string, experience: string, about: string, TorS: string, auth: string, branch: string): void {
          const personRef: firebase.database.Reference = firebase.database().ref(branch + auth);
          personRef.update({
            name,
            age,
            location,
            classes,
            experience,
            about,
            TorS,
            auth
          });
      }
}
