import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { EditteacherprofilePage } from "../pages/editteacherprofile/editteacherprofile";
import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =  HomePage;

  constructor(platform: Platform, private afAuth: AngularFireAuth, private statusBar: StatusBar, private splashScreen: SplashScreen) {
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
