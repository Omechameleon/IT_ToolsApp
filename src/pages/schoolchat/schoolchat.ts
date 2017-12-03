import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SchoolchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schoolchat',
  templateUrl: 'schoolchat.html',
})
export class SchoolchatPage {

  @ViewChild(Content) content: Content;

  username: string = "";
  teacherAuthentication: string = "";
  schoolAuthentication: string = "";
  message: string = "";
  subscription;
  messages: object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase) 
  {
    this.username = navParams.get('schoolAuthentication');
    this.teacherAuthentication = navParams.get('teacherAuthentication');
    this.schoolAuthentication = navParams.get('schoolAuthentication');
    this.subscription = this.afDatabase.list('/chat/' + this.schoolAuthentication + '/' +this.teacherAuthentication).valueChanges().subscribe( data => 
    {
      this.messages = data;
    });
  }

  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolchatPage');
  }


  sendMessage()
  {
    this.afDatabase.list('/chat/' + this.schoolAuthentication + '/' +this.teacherAuthentication).push({
      teacherAuthentication: this.teacherAuthentication,
      schoolAuthentication: this.schoolAuthentication,
      message: this.message,
      username: this.schoolAuthentication
    });
    this.message = "";
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+500, 100);
  }
}
