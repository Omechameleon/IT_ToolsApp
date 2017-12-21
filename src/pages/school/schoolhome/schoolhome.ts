import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../../login/login';
import { EditschoolprofilePage } from '../editschoolprofile/editschoolprofile';
import { TeacherlistPage } from '../teacherlist/teacherlist';
import { AngularFireDatabase } from 'angularfire2/database';
import { SchoolchatselectionPage } from '../schoolchatselection/schoolchatselection';



@Component({
  selector: 'page-schoolhome',
  templateUrl: 'schoolhome.html',
})
export class SchoolhomePage {

  public schoolProfileData = {};

  constructor(private nativePageTransitions: NativePageTransitions, private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth) 
  {
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
   
  //Binnen ionViewDidLoad() halen we alle huidige data op voor de huidige user
  ionViewDidLoad(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid)
      {
        this.toastCtrl.create(
        {
          message: 'Welkom ' + data.email,
          duration: 3000
        })
        .present();
          
        const personRef: firebase.database.Reference = firebase.database().ref(`/school/` + data.uid);
        personRef.on('value', personSnapshot => {
          this.schoolProfileData = personSnapshot.val();
        });
      }
    });
  }


  //Onderstaande code behelst uitloggen en het navigeren tussen pagina's
  
  signout()
  {
    this.afAuth.auth.signOut();
  }

  editProfile()
  {
    this.navCtrl.push(EditschoolprofilePage);
  }

  teacherlistPage()
  {
    this.navCtrl.push(TeacherlistPage);
  }

  schoolchatselectionPage()
  {
    this.navCtrl.push(SchoolchatselectionPage)
  }

}
