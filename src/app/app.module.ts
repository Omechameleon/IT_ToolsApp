import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TeacherhomePage } from '../pages/teacherhome/teacherhome';
import { SchoolhomePage } from '../pages/schoolhome/schoolhome';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { EditteacherprofilePage } from "../pages/editteacherprofile/editteacherprofile";
import { EditschoolprofilePage } from '../pages/editschoolprofile/editschoolprofile';
import { TeacherlistPage } from '../pages/teacherlist/teacherlist';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
    SignupPage,
    EditteacherprofilePage,
    TeacherhomePage,
    SchoolhomePage,
    EditschoolprofilePage,
    TeacherlistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    EditteacherprofilePage,
    TeacherhomePage,
    SchoolhomePage,
    EditschoolprofilePage,
    TeacherlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
