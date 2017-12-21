import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TeacherhomePage } from '../pages/teacher/teacherhome/teacherhome';
import { SchoolhomePage } from '../pages/school/schoolhome/schoolhome';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { EditteacherprofilePage } from "../pages/teacher/editteacherprofile/editteacherprofile";
import { EditschoolprofilePage } from '../pages/school/editschoolprofile/editschoolprofile';
import { TeacherlistPage } from '../pages/school/teacherlist/teacherlist';
import { SchoolchatPage } from '../pages/school/schoolchat/schoolchat';
import { TeacherchatPage } from '../pages/teacher/teacherchat/teacherchat';
import { SchoolchatselectionPage } from '../pages/school/schoolchatselection/schoolchatselection';
import { TeacherchatselectionPage } from '../pages/teacher/teacherchatselection/teacherchatselection';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';

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
    TeacherlistPage,
    SchoolchatPage,
    TeacherchatPage,
    SchoolchatselectionPage,
    TeacherchatselectionPage,
    ResetpasswordPage
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
    TeacherlistPage,
    SchoolchatPage,
    TeacherchatPage,
    SchoolchatselectionPage,
    TeacherchatselectionPage,
    ResetpasswordPage
  ],
  providers: [
    StatusBar,
    NativePageTransitions,
    SplashScreen,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
