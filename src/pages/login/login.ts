import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";
import { SignupPage } from '../signup/signup';
import { EditprofilePage } from '../editprofile/editprofile';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  loginData = {
  email: 'pieterjan.defeyter@ucll.be',
  password: 'test!!'
  }
  constructor(private navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  teacherLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .then(auth =>{
      this.navCtrl.setRoot(HomePage);
    })
    .catch(err =>{
      // Handle error
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 5000
      });
      toast.present();
    });
  }

  teacherSignup(){
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }


}
