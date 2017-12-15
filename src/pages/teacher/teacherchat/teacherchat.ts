import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
/**
 * Generated class for the TeacherchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacherchat',
  templateUrl: 'teacherchat.html',
})
export class TeacherchatPage {

  //Deze regel is nodig voor het automatisch scrollen dat welater zullen uitvoeren binnen de chat
  @ViewChild(Content) content: Content;
  
  username: string = "";
  teacherAuthentication: string = "";
  schoolAuthentication: string = "";
  message: string = "";
  subscription;
  messages: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    //We wijzen de waarden die we van de vorige pagina doorgegeven krijgen toe aan de correcte variabelen
    this.username = navParams.get('teacherAuthentication');
    this.teacherAuthentication = navParams.get('teacherAuthentication');
    this.username = navParams.get('teacherAuthentication');
    this.schoolAuthentication = navParams.get('schoolAuthentication');
    //We halen de bestaande boodschappen van de huidige chat op
    this.subscription = this.afDatabase.list('/chat/' + this.schoolAuthentication + '/' + this.teacherAuthentication).valueChanges().subscribe( data => {
      this.messages = data;
    });
  }

  //We scrollen meteen naar de onderkant van de chat bij het "binnenkomen"
  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
  }

  //sendMessage stuurt de getypte boodschap (en door wie) door naar de database waarna de input weer geleegd wordt
  //De boodschap zal toegevoegd worden binnen de chat, daarom scrollen we ook hier weer naar de onderkant van de pagina
  sendMessage()
  {
    this.afDatabase.list('/chat/' + this.schoolAuthentication + '/' +this.teacherAuthentication).push({
      teacherAuthentication: this.teacherAuthentication,
      schoolAuthentication: this.schoolAuthentication,
      message: this.message,
      username: this.teacherAuthentication
    });
    this.message = "";
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);  
  }
}
