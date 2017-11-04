import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAmsc5HMgD2Yk-lKzBScBHLem5QSGc7rYc",
  authDomain: "teacherreacher-4a5b0.firebaseapp.com",
  databaseURL: "https://teacherreacher-4a5b0.firebaseio.com",
  projectId: "teacherreacher-4a5b0",
  storageBucket: "teacherreacher-4a5b0.appspot.com",
  messagingSenderId: "777674020415"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
