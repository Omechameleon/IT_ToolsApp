import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
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
  

  constructor(private nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    //We nemen de data van de huidige geauthenticeerde user en geven ze door aan de onLoading methode
    this.afAuth.authState.take(1).subscribe(data => {this.teacherAuth = data.uid});
    this.afAuth.authState.take(1).subscribe(auth => 
      {
        this.onLoading(auth);
      });
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
   
  onLoading(auth: any) {

    //Deze checks gebruiken we om problemen met async te vermijden
    var check1 = 0;
    var check2 = 0;

    //We halen alle schooldata op
    const personRef2: firebase.database.Reference = firebase.database().ref(`/school/`);
    personRef2.on('value', personSnapshot => {
    this.allSchoolData = personSnapshot.val();
    check1 = 1;
    if(check2 == 1){
      this.checkData();
    }
    });

    //We halen alle chatdata op
    const personRef3: firebase.database.Reference = firebase.database().ref(`/chat/`);
    personRef3.on('value', personSnapshot => {
    this.allChatData = personSnapshot.val();
    check2 = 1;
    if(check1 == 1){
      this.checkData();
    }
    });
  }

  //We controleren voor welke scholen de huidige user een actieve chat heeft
  //We steken de uid van deze scholen in de activeChatPartners array
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

    //Als er geen actieve chatpartners zijn wordt dit gemeld aan de user 
    //en wordt de user teruggestuurd naar de homepage
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

    //We vergelijken nu de array met actieve chatpartners met die van alle schooluid's
    //Bij overeenkomst wordt alle data voor die school binnen de array allUsableSchoolData
    //Deze data tonen we in onze cards
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

  //We sturen de user door naar de TeacherChatPage en geven de nodige data mee
  openChat(auth: string)
  {
    this.navCtrl.push(TeacherchatPage, {
      teacherAuthentication: this.teacherAuth,
      schoolAuthentication: auth
    });
  }

  //Als de user zijn/haar chat met een school wil verwijderen vragen we eerst om bevestiging
  //Bij bevestiging verwijderen we de branch in de database voor de gekozen school bij deze leerkracht
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
