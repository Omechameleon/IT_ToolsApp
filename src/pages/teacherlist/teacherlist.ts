import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';

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
  public singleTeacherData = {};
  public allTeacherData = {};
  public allUsableTeacherData = [];

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth) 
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
}
