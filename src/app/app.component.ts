import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { EditteacherprofilePage } from "../pages/teacher/editteacherprofile/editteacherprofile";
import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from 'angularfire2/auth';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =  HomePage;

  constructor(platform: Platform, private afAuth: AngularFireAuth, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    //Als er geen user geautoriseerd is wordt de gebruiker doorverwezen naar de LoginPage
    //Als er een user geautoriseerd is wordt de gebruiker doorverwezen naar de HomePage
    this.afAuth.authState.subscribe(auth => {
      if(!auth){
        this.rootPage = LoginPage;
        }
      else{
        this.rootPage = HomePage;
        }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
