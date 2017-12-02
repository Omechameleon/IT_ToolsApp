import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { TeacherchatPage } from '../teacherchat/teacherchat';
/**
 * Generated class for the TeacherchatselectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherchatselection',
  templateUrl: 'teacherchatselection.html',
})
export class TeacherchatselectionPage {
  tableNames;
  teacherAuth;
  public allTeacherUids = [];
  public activeChatPartners = [];
  public PossibleChatPartners = [];
  public singleSchoolData = {};
  public allSchoolData = {};
  public allUsableSchoolData = [];
  public chatPerSchool;
  public allChatData = {};
  public possibleChatsData = [];
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.take(1).subscribe(data => {this.teacherAuth = data.uid});
    this.afAuth.authState.take(1).subscribe(auth => 
      {
        this.onLoading(auth);
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherchatselectionPage');
  }

  onLoading(auth: any) {
    var check1 = 0;
    var check2 = 0;
    var check3 = 0;
    var check4 = 0;

    const personRef1: firebase.database.Reference = firebase.database().ref(`/school/`);
    personRef1.on('value', personSnapshot => {
    this.tableNames = Object.keys(personSnapshot.val());
    check1 = 1;
    if((check2 == 1) && (check3 == 1) && (check4 == 1)){
      this.checkData();
    }
    });

    const personRef2: firebase.database.Reference = firebase.database().ref(`/school/`);
    personRef2.on('value', personSnapshot => {
    this.allSchoolData = personSnapshot.val();
    check2 = 1;
    if((check1 == 1) && (check3 == 1) && (check4 == 1)){
      this.checkData();
    }
    });

    const personRef3: firebase.database.Reference = firebase.database().ref(`/chat/`);
    personRef3.on('value', personSnapshot => {
    this.allChatData = personSnapshot.val();
    check3 = 1;
    if((check1 == 1) && (check2 == 1) && (check4 == 1)){
      this.checkData();
    }
    });

    const personRef4: firebase.database.Reference = firebase.database().ref(`/teacher/`);
    personRef4.on('value', personSnapshot => {
    this.allTeacherUids = Object.keys(personSnapshot.val());
    check4 = 1;
    if((check1 == 1) && (check2 == 1) && (check3 == 1)){
      this.checkData();
    }
    });
  }

  checkData()
  { var index = 0;
    for(var schoolUid in this.allChatData) {
      index++;
      for(var teacherUid in this.allChatData[schoolUid])
      {
        if(teacherUid == this.teacherAuth)
        {
          this.activeChatPartners[index] = schoolUid;
        }
      }
    }
    console.log(this.activeChatPartners);
  }

  openChat(auth: string)
  {
    this.navCtrl.push(TeacherchatPage, {
      teacherAuthentication: auth,
      schoolAuthentication: this.teacherAuth
    });
  }

}
