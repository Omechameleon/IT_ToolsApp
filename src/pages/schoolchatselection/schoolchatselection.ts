import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { SchoolchatPage } from '../schoolchat/schoolchat';
import { SchoolhomePage } from '../schoolhome/schoolhome';

/**
 * Generated class for the SchoolchatselectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolchatselection',
  templateUrl: 'schoolchatselection.html',
})
export class SchoolchatselectionPage {
  tableNames;
  schoolAuth;
  public activeChatPartners = [];
  public singleTeacherData = {};
  public allTeacherData = {};
  public allUsableTeacherData = [];

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    this.afAuth.authState.take(1).subscribe(data => {
      this.schoolAuth = data.uid;
      this.onLoading(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolchatselectionPage');
  }

  onLoading(auth: any) {
    var check1 = 0;
    var check2 = 0;
    var check3 = 0;

    const personRef1: firebase.database.Reference = firebase.database().ref(`/teacher/`);
    personRef1.on('value', personSnapshot => {
    this.tableNames = Object.keys(personSnapshot.val());
    check1 = 1;
    if((check2 == 1) && (check3 == 1)){
      this.onDataLoaded();
    }
    });

    const personRef2: firebase.database.Reference = firebase.database().ref(`/teacher/`);
    personRef2.on('value', personSnapshot => {
    this.allTeacherData = personSnapshot.val();
    check2 = 1;
    if((check1 == 1) && (check3 == 1)){
      this.onDataLoaded();
    }
    });

    const personRef3: firebase.database.Reference = firebase.database().ref(`/chat/` + auth.uid);
    personRef3.on('value', personSnapshot => {
      if(!personSnapshot.val())
      {
        let confirm = this.alertCtrl.create({
          title: "Geen chats gevonden",
          message: "U heeft nog geen leerkrachten gecontacteerd.",
          buttons: 
          [{
            text: 'Keer terug',
            handler: () => {
              this.navCtrl.push(SchoolhomePage);
            }
          }]
        });
        confirm.present();
      }
      else{
        this.activeChatPartners = Object.keys(personSnapshot.val());
        check2 = 1;
        if((check1 == 1) && (check2 == 1))
        {
          this.onDataLoaded();
        }
      }
    });
  }

  onDataLoaded()
  { 
    for (var index = 0; index < this.tableNames.length; index++) {
      for(var index2 = 0; index2 < this.activeChatPartners.length;  index2++)
      {
        if(this.tableNames[index] == this.activeChatPartners[index2])
        {
          this.singleTeacherData = this.allTeacherData[this.tableNames[index]];
          if((this.singleTeacherData != undefined) && (this.singleTeacherData != null)){
            this.allUsableTeacherData[index2] = this.singleTeacherData;
          }
        }
      }
      console.log(this.allUsableTeacherData);
    }
  }
  

  openChat(auth: string)
  {
    this.navCtrl.push(SchoolchatPage, {
      teacherAuthentication: auth,
      schoolAuthentication: this.schoolAuth,
    });
  }
}
