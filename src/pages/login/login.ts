import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
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
  //We declareren het object loginData met de eigenschappen email en password
  //Deze zijn nodig voor het inloggen en horen leeg te zijn
  //Momenteel zijn deze eigenschappen al ingevuld, dit vergemakkelijkt het testen voor ons
  loginData = {
  email: 'pieterjan.defeyter@ucll.teacher',
  password: 'test!!'
  }

  constructor(private nativePageTransitions: NativePageTransitions, private navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private toastCtrl: ToastController) {
  }


  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
       direction: 'up',
       duration: 200,
       slowdownfactor: 3,
       slidePixels: 20,
       iosdelay: 100,
       androiddelay: 150,
       fixedPixelsTop: 0,
       fixedPixelsBottom: 60
      };
    this.nativePageTransitions.slide(options);
   }

  teacherLogin(){
    //Binnen deze methode proberen we met de ingevulde credentials de gebruiker te authoriseren
    //De pagina src\app\app.component.ts pikt dan op dat de gebruiker ingelogd is en verwijst de gebruiker door naar de HomePage
    //Indien dit niet lukt krijgt de gebruiker een boodschap te zien waarin we vermelden dat we geen gebruiker konden voor deze credentials
    //De gebruiker moet dan controleren of hij/zij de juiste credentials heeft ingegeven. 
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
    .catch(err =>{
      let toast = this.toastCtrl.create({
        message: "We vonden geen account die overeenkomt met dit paswoord. Gelieve uw invoer te controleren.",
        duration: 5000
      });
      toast.present();
      console.log(err.message);
    });
  }

  teacherSignup(){
    //Deze methode wordt aangeroepen als er op de corresponderende knop wordt gedrukt
    //Als er al een emailadres werd ingegeven in het login inputveld, geven we dit ook mee naar de SignupPage
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }

  resetPassword()
  {
    //Deze methode wordt aangeroepen als er op de corresponderende knop wordt gedrukt
    this.navCtrl.push(ResetpasswordPage);
  }

}
