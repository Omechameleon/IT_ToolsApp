import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { EditprofilePage } from '../editprofile/editprofile';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { TeacherProfile } from './../../models/teacherProfile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  public teacherProfileData: FirebaseObjectObservable<TeacherProfile>

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private navCtrl: NavController, private afAuth: AngularFireAuth)
  {}

  ionViewDidLoad(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid)
      {

        this.toastCtrl.create(
          {
            message: 'Welkom ' + data.email,
            duration: 3000
          })
          .present();

        //this.teacherProfileData = this.afDatabase.object<TeacherProfile>('profile/' + data.uid).valueChanges();

        //this.teacherProfileData = this.afDatabase.object('profile/' + data.uid)
        //.snapshotChanges()
        //.map(action => { const tData = { ...action.payload
        //  .val() }; console.log(tData); return tData; })
        //.subscribe(item =>{ /*console.log(item)*/});  //Vraag hier gegevens op zoals console.log(item.experience) });
        //console.log(this.TeacherProfileData);

        this.teacherProfileData = this.afDatabase.object('profile/' + data.uid)
        .valueChanges()
        .subscribe(item => { console.log(item); return item;})

        console.log(this.TeacherProfileData);

/*
// component
public item$: Observable<Item>;

ngOnInit() {
  this.item$ = this.db.object<Item>('/item').valueChanges();
}

// template
<div *ngIf="item$ | async as item">
  First name is {{ item?.firstName }}
</div>
*/

      }
      else{
        this.toastCtrl.create({
          message: 'Kon geen authenticatiedetails vinden',
          duration: 3000
        }).present();
      }
    })
  }


  teacherSignout()
  {
    this.afAuth.auth.signOut();
  }

  editProfile()
  {
    this.navCtrl.push(EditprofilePage);
  }

}
