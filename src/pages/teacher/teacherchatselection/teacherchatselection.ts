import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { TeacherchatPage } from '../teacherchat/teacherchat';
import { TeacherhomePage } from '../teacherhome/teacherhome';

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
  teacherAuth;
  public activeChatPartners = [];
  public allSchoolData = {};
  public allUsableSchoolData = [];
  public allChatData = {};
  

  constructor(private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.take(1).subscribe(data => {this.teacherAuth = data.uid});
    this.afAuth.authState.take(1).subscribe(auth => 
      {
        this.onLoading(auth);
      });
  }
  
  onLoading(auth: any) {
    var check1 = 0;
    var check2 = 0;

    const personRef2: firebase.database.Reference = firebase.database().ref(`/school/`);
    personRef2.on('value', personSnapshot => {
    this.allSchoolData = personSnapshot.val();
    check1 = 1;
    if(check2 == 1){
      this.checkData();
    }
    });

    const personRef3: firebase.database.Reference = firebase.database().ref(`/chat/`);
    personRef3.on('value', personSnapshot => {
    this.allChatData = personSnapshot.val();
    check2 = 1;
    if(check1 == 1){
      this.checkData();
    }
    });
  }

  checkData()
  { 
    var index = 0;
    for(var schoolUid in this.allChatData) {
      for(var teacherUid in this.allChatData[schoolUid])
      {
        if((teacherUid == this.teacherAuth))
        {
          this.activeChatPartners[index] = schoolUid;
          index++;
        }
      }
    }

    if(this.activeChatPartners.length == 0)
    {
      let confirm = this.alertCtrl.create({
        title: "Geen chats gevonden",
        message: "U bent nog niet door een school gecontacteerd.",
        buttons: 
        [{
          text: 'Sluiten'
        }]
      });
      confirm.present();
      this.navCtrl.setRoot(TeacherhomePage);
    }

    index = 0;
    for(var schoolUid in this.allSchoolData)
    {
      if(this.activeChatPartners[index] == schoolUid)
      {
        this.allUsableSchoolData[index] = this.allSchoolData[this.activeChatPartners[index]];
        index++;
      }
    }
  }

  openChat(auth: string)
  {
    this.navCtrl.push(TeacherchatPage, {
      teacherAuthentication: this.teacherAuth,
      schoolAuthentication: auth
    });
  }

  deleteChat(schoolAuth: string)
  {
    let confirm = this.alertCtrl.create({
      title: "Waarschuwing",
      subTitle: "U staat op het punt om de chat met deze school te verwijderen.",
      buttons: [
        {
          text: 'Verwijder',
          handler: () => {
            this.navCtrl.push(TeacherchatselectionPage);
            const personRef: firebase.database.Reference = firebase.database().ref('/chat/' + schoolAuth+ '/' + this.teacherAuth);
            personRef.remove();
          }
        },
        {
          text: 'Annuleren'         
        }
      ]
    });
    confirm.present();
  }

}
