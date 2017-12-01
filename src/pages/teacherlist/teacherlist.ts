import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { SchoolchatPage } from '../schoolchat/schoolchat';

/**
 * Generated class for the TeacherlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherlist',
  templateUrl: 'teacherlist.html',
})
export class TeacherlistPage {
  tableNames;
  public usableTableNames = [];
  public singleTeacherData = {};
  public allTeacherData = {};
  public allUsableTeacherData = [];

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  {
    this.onLoading();
  }

  onLoading() {
    var check1 = 0;
    var check2 = 0;

    const personRef: firebase.database.Reference = firebase.database().ref(`/teacher/`);

    personRef.on('value', personSnapshot => {
    this.tableNames = Object.keys(personSnapshot.val());
    check1 = 1;
    if(check2 == 1){
      this.onDataLoaded();
    }
    });

    personRef.on('value', personSnapshot => {
    this.allTeacherData = personSnapshot.val();
    check2 = 1;
    if(check1 = 1){
      this.onDataLoaded();
    }
    });


  }

  onDataLoaded()
  {
    for (var index = 0; index < this.tableNames.length; index++) {
      this.singleTeacherData = this.allTeacherData[this.tableNames[index]];
      this.allUsableTeacherData[index] = this.singleTeacherData;
      console.log(this.allUsableTeacherData[index]);
    }
    console.log(this.allUsableTeacherData);
  }

  showDetails(auth: string)
  {
    var teacherData;
    for (var index = 0; index < this.tableNames.length; index++) 
    {
      if(this.tableNames[index] == auth)
      {
        teacherData = this.allUsableTeacherData[index];
        console.log(teacherData);
      }
    }

    let confirm = this.alertCtrl.create({
      title: teacherData.name,
      message: teacherData.classes,
      buttons: [
        {
          text: 'Stuur een Boodschap?',
          handler: () => {
            console.log('boodschap gestuurd!');
            this.navCtrl.push(SchoolchatPage, {
              teacherAuthentication: auth
            });
          }
        },
        {
          text: 'Keer terug',
          handler: () => {
            console.log('Terugkeren geklikt');
          }          
        }
      ]
    });
    confirm.present();
  }
}
