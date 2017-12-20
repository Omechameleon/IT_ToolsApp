import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
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

  constructor(private nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    //We nemen de data van de huidige geauthenticeerde user en geven ze door aan de onLoading methode
    this.afAuth.authState.take(1).subscribe(data => {
      this.schoolAuth = data.uid;
      this.onLoading(data);
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
    var check3 = 0;

    //We halen alle leerkrachtuid's op
    const personRef1: firebase.database.Reference = firebase.database().ref(`/teacher/`);
    personRef1.on('value', personSnapshot => {
    this.tableNames = Object.keys(personSnapshot.val());
    check1 = 1;
    if((check2 == 1) && (check3 == 1)){
      this.onDataLoaded();
    }
    });

    //We halen alle leerkrachtdata op
    const personRef2: firebase.database.Reference = firebase.database().ref(`/teacher/`);
    personRef2.on('value', personSnapshot => {
    this.allTeacherData = personSnapshot.val();
    check2 = 1;
    if((check1 == 1) && (check3 == 1)){
      this.onDataLoaded();
    }
    });

    //We halen alle chatpartnernamen op van de huidige ingelogde user/school als die er zijn, anders wordt de user teruggestuurd naar de homepage
    const personRef3: firebase.database.Reference = firebase.database().ref(`/chat/` + auth.uid);
    personRef3.on('value', personSnapshot => {
      if(!personSnapshot.val())
      {
        let confirm = this.alertCtrl.create({
          title: "Geen chats gevonden",
          message: "U hebt nog geen leerkrachten gecontacteerd.",
          buttons: 
          [{
            text: 'Sluiten'
          }]
        });
        confirm.present();
        this.navCtrl.setRoot(SchoolhomePage);
        return;
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

  //onDataLoaded geeft ons de array met alle huidige chatpartners van de user/school met alle bijbehorende data
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
    }
  }
  
  //We sturen de user door naar de SchoolChatPage en geven de nodige data mee
  openChat(auth: string)
  {
    this.navCtrl.push(SchoolchatPage, {
      teacherAuthentication: auth,
      schoolAuthentication: this.schoolAuth,
    });
  }

  //Als de user zijn/haar chat met een leerkracht wil verwijderen vragen we eerst om bevestiging
  //Bij bevestiging verwijderen we de branch in de database voor de gekozen leerkracht bij deze school
  deleteChat(teacherAuth: string)
  {
    let confirm = this.alertCtrl.create({
      title: "Waarschuwing",
      subTitle: "U staat op het punt om de chat met deze leerkracht te verwijderen.",
      buttons: [
        {
          text: 'Verwijder',
          handler: () => {
            this.navCtrl.push(SchoolchatselectionPage);
            const personRef: firebase.database.Reference = firebase.database().ref('/chat/' + this.schoolAuth+ '/' + teacherAuth);
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
