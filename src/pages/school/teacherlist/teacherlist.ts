import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { SchoolchatPage } from '../schoolchat/schoolchat';

/**
 * Generated class for the TeacherlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-teacherlist',
  templateUrl: 'teacherlist.html',
})
export class TeacherlistPage {

  //Declareren van nodige variabelen, arrays en objecten
  tableNames;
  searchData = "";
  public usableTableNames = [];
  public singleTeacherData = {};
  public allTeacherData = {};
  public allUsableTeacherData = [];
  public backupAllUsableTeacherData = [];
  

  constructor(private nativePageTransitions: NativePageTransitions, private alertCtrl: AlertController, private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  {
    this.onLoading();
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
   
  //Binnen onLoading halen we alle nodige data op uit de database
  //We gebruiken wederom twee checks om async problemen te vermijden
  onLoading() {
    var check1 = 0;
    var check2 = 0;

    //We halen alle leerkrachtuid's op uit de database, zonder de bijbehorende data
    const personRef: firebase.database.Reference = firebase.database().ref(`/teacher/`);
    personRef.on('value', personSnapshot => {
    this.tableNames = Object.keys(personSnapshot.val());
    check1 = 1;
    if(check2 == 1){
      this.onDataLoaded();
    }
    });

    //We halen alle leerkrachtdata op uit de database
    personRef.on('value', personSnapshot => {
    this.allTeacherData = personSnapshot.val();
    check2 = 1;
    if(check1 == 1){
      this.onDataLoaded();
    }
    });
  }

  //onDataLoaded steekt alle leerkrachtdata in een array zodat deze makkelijk toonbaar wordt in de htmlpagina
  //We maken ook een backuparray aan. Deze wordt later gebruikt voor de zoekfunctie van de pagina
  onDataLoaded()
  {
    //tableNames.length geeft aan hoeveel leerkrachten er zijn
    for (var index = 0; index < this.tableNames.length; index++) {
      //allteacherData bevat alle data per leerkracht met als key de bijbehorende uid van die leerkracht
      //Hierom hadden we de array met leerkrachtenuid's nodig
      this.singleTeacherData = this.allTeacherData[this.tableNames[index]];
      //De data van elke leerkracht steken we in een array waardoor het mogelijk wordt om de data uit te lezen met een lus in de htmlpagina
      //Dit was niet mogelijk met een object
      this.allUsableTeacherData[index] = this.singleTeacherData;
      this.backupAllUsableTeacherData[index] = this.singleTeacherData;
    }
  }

  //showDetails toont meer details over de gekozen leerkracht
  //en maakt het mogelijk om een boodschap naar deze leerkracht te sturen
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

  //searchClasses zorgt ervoor dat er volgens vak naar leerkrachten gezocht kan worden
  searchClasses(zoekterm: string)
  {
    //We voeren eerst nog eens onLoading uit om ervoor te zorgen dat we weer de originele data uit de database hebben
    //dit omdat we genboodzaakt zijn om de data arrays aan te passen
    this.onLoading();
    //We transformeren de zoekterm volledig naar hoofdletters zodat case sensitivity geen probleem is
    zoekterm = zoekterm.toUpperCase();
    if(!zoekterm)
    {
      //Als er geen zoekterm werd ingegeven wordt de leerkrachtenlijst gereset naar het origineel
      //doordat we onLoading weer hebben uitgevoerd en deze data wordt getoond
      return;
    }
    else{
      var index2 = 0;
      this.allUsableTeacherData = [null];

      //Voor elke leerkracht controleren we of de zoekterm voorkomt binnen hun opgegeven vakken
      for(var index = 0; index < this.backupAllUsableTeacherData.length; index++)
      {
        //We transformeren de vakken van de leerkracht naar hoofdletters en vervangen de originele data met de nieuwe binnen de backuparray
        var specificClass = this.backupAllUsableTeacherData[index].classes;
        var upperCaseClass = specificClass.toUpperCase();
        this.backupAllUsableTeacherData[index].classes = upperCaseClass;

        //Hier controleren we of de zoekterm voorkomt binnen de leerkrachtdata
        //Voor elke leerkracht waarbij dit het geval is voegen we die toe aan de allUsableTeacherData array
        //Deze wordt namelijk doorlopen om leerkrachtdata te tonen
        if(this.backupAllUsableTeacherData[index].classes.search(zoekterm) > -1)
        {
          this.backupAllUsableTeacherData[index].classes = specificClass;
          this.allUsableTeacherData[index2] = this.backupAllUsableTeacherData[index];
          index2++;
        }
      }
      if(!this.allUsableTeacherData[0])
      {
        //Als er geen enkele leerkracht gevonden werd met de huidige zoekterm
        //tonen we een alert die dit aangeeft en voeren we onLoading weer uit om de volledige leerkrachtenlijst te tonen
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