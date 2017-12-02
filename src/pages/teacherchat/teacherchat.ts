import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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

  //username: string = "";
  teacherAuthentication: string = "";
  schoolAuthentication: string = "";
  message: string = "";
  subscription;
  messages: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) {
    this.teacherAuthentication = navParams.get('teacherAuthentication');
    //this.username = navParams.get('teacherAuthentication');
    this.schoolAuthentication = navParams.get('schoolAuthentication');
    this.subscription = this.afDatabase.list('/chat/' + this.schoolAuthentication + '/' + this.teacherAuthentication).valueChanges().subscribe( data => {
    this.messages = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherchatPage');
  }

  sendMessage()
  {
    console.log(this.schoolAuthentication);
    this.afDatabase.list('/chat/' + this.schoolAuthentication + '/' +this.teacherAuthentication).push({
      teacherAuthentication: this.teacherAuthentication,
      schoolAuthentication: this.schoolAuthentication,
      message: this.message
    });
    this.message = "";
  }

}
