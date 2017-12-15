import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { AngularFireDatabase/*, AngularFireList*/ } from 'angularfire2/database';
import { TeacherhomePage } from '../teacher/teacherhome/teacherhome';
import { SchoolhomePage } from '../school/schoolhome/schoolhome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  //We declareren de teacherProfileData & schoolProfileData objecten met de TorS-eigenschap (Teacher or School)
  public teacherProfileData = {TorS: ''};
  public schoolProfileData = {TorS: ''};

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth, private loadingCtrl: LoadingController)
  {
    //We roepen meteen de onReached methode aan
    this.onReached();
  }

  ionViewDidLoad() 
  {
    //We roepen bij het inladen van de pagina een laadanimatie met boodschap op.
    //Dit blijft op het scherm staan tot er van pagina veranderd wordt.
    let loader = this.loadingCtrl.create({
      content: "Even geduld, aub...",
      dismissOnPageChange: true
    });
    loader.present();
  }

  onReached()
  {
    //We declareren deze checks omdat we ze later gebruiken om problemen te vermijden 
    //bij het async oproepen van data uit de database
    var check1 = 0;
    var check2 = 0;

    //We nemen de data van de geautoriseerde user, als die er is
    this.afAuth.authState.take(1).subscribe(data =>
    { if(!data)
      {
        //Als er geen user geautoriseerd is, wordt de gebruiker doorverwezen naar de LoginPage
        this.navCtrl.setRoot(LoginPage);
      }
      else{
      //Als er een user geautoriseerd is, moeten we eerst achterhalen of het om een school of een leerkracht gaat
      //Daarom nemen we de UID van de huidige geautoriseerde user en proberen we hiermee data op te halen uit de database
      //We proberen dit zowel voor de schooltabel als de teachertabel
      //Uit de tabel waar de user tot behoort zullen we data krijgen en niets uit de andere
      //Hier gebruiken we onze checks om te voorkomen dat we de redirect methode oproepen voordat alle nodige data is opgehaald

      const personRef1: firebase.database.Reference = firebase.database().ref(`/teacher/` + data.uid);
      personRef1.on('value', personSnapshot => {
        this.teacherProfileData = personSnapshot.val();
        check1 = 1;
        if (check2 == 1) {
          this.redirect();
        }
      });
      
      const personRef2: firebase.database.Reference = firebase.database().ref(`/school/` + data.uid);
      personRef2.on('value', personSnapshot => {
        this.schoolProfileData = personSnapshot.val();
        check2 = 1;
        if (check1 == 1) {
          this.redirect();
        }
      });
    }  
    });
  }
  
  redirect()
  {
    //Binnen deze methode controleren we dus welke data we succesvol hebben kunnen ophalen
    //Dit bepaalt dus ook naar welke homepage we de user doorverwijzen, die van de teacher of die van de school
    //Indien er geen data werd gevonden is er iets onverwachts misgelopen bij het aanmaken van de gebruiker 
    //(dit is tijdens testing nog nooit gebeurd, maar de beveiliging kan er maar zijn)
    if(this.teacherProfileData != null)
    {
      this.navCtrl.setRoot(TeacherhomePage);
    }
    else if(this.schoolProfileData != null)
    {
      this.navCtrl.setRoot(SchoolhomePage);
    }
    else{
      this.toastCtrl.create(
        {
          message: "Er werd geen data gevonden voor deze gebruiker. Gelieve een profiel aan te maken.",
          duration: 5000
        })
        .present();
    }
  }
}
