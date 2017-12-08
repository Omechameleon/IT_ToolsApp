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
  searchData = "";
  public usableTableNames = [];
  public singleTeacherData = {};
  public allTeacherData = {};
  public allUsableTeacherData = [];
  public backupAllUsableTeacherData = [];
  

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
    if(check1 == 1){
      this.onDataLoaded();
    }
    });


  }

  onDataLoaded()
  {
    for (var index = 0; index < this.tableNames.length; index++) {
      this.singleTeacherData = this.allTeacherData[this.tableNames[index]];
      this.allUsableTeacherData[index] = this.singleTeacherData;
      this.backupAllUsableTeacherData[index] = this.singleTeacherData;
    }
  }

  showDetails(auth: string)
  {
    var teacherData;
    var schoolAuth;
    this.afAuth.authState.take(1).subscribe(data => {schoolAuth = data.uid});

    for (var index = 0; index < this.tableNames.length; index++) 
    {
      if(this.tableNames[index] == auth)
      {
        teacherData = this.allUsableTeacherData[index];
      }
    }

    let confirm = this.alertCtrl.create({
      title: teacherData.name + ", " + teacherData.age,
      subTitle: teacherData.classes,
      message: teacherData.about,
      buttons: [
        {
          text: 'Keer terug'         
        },
        {
          text: 'Stuur een Boodschap',
          handler: () => {
            this.navCtrl.push(SchoolchatPage, {
              teacherAuthentication: auth,
              schoolAuthentication: schoolAuth
            });
          }
        }
      ]
    });
    confirm.present();
  }

  searchClasses(zoekterm: string)
  {
    zoekterm = zoekterm.toUpperCase();
    console.log(zoekterm);
    if(!zoekterm)
    {
      this.onLoading();
    }
    else{
      var index2 = 0;
      this.allUsableTeacherData = [null];
      for(var index = 0; index < this.backupAllUsableTeacherData.length; index++)
      {
        var specificClass = this.backupAllUsableTeacherData[index].classes;
        var upperCaseClass = specificClass.toUpperCase();
        this.backupAllUsableTeacherData[index].classes = upperCaseClass;

        if(this.backupAllUsableTeacherData[index].classes.search(zoekterm) > -1)
        {
          this.backupAllUsableTeacherData[index].classes = specificClass;
          this.allUsableTeacherData[index2] = this.backupAllUsableTeacherData[index];
          index2++;
        }
      }
      if(!this.allUsableTeacherData[0])
      {
        let confirm = this.alertCtrl.create({
          title: "Geen leerkrachten gevonden!",
          message: "Deze zoekterm leverde geen resultaten op. Probeer een andere term of controleer dat er geen spelfouten gemaakt zijn.",
          buttons: [
            {
              text: 'Keer terug'         
            }
          ]
        });
        confirm.present();
        this.onLoading(); 
        return;
      }
    }
  }
}