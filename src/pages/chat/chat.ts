import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  teacherAuthentication: string = "";
  message: string = "";
  subscription;
  messages: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.teacherAuthentication = navParams.get('teacherAuthentication');
    this.subscription = this.afDatabase.list('/chat').valueChanges().subscribe( data => {
      this.messages = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    console.log(this.navParams.data);
    console.log(this.teacherAuthentication);
  }

  sendMessage()
  {
    this.afDatabase.list('/chat').push({
      teacherAuthentication: this.teacherAuthentication,
      message: this.message
    });
  }

}
