import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
/**
 * Generated class for the EditschoolprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editschoolprofile',
  templateUrl: 'editschoolprofile.html',
})
export class EditschoolprofilePage {

  public schoolProfileData = {};

  constructor(private nativePageTransitions: NativePageTransitions, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
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
   
  //Elke keer bij het tonen van de EditschoolprofilePage halen we de huidige data van de user op uit de database
  ionViewDidEnter(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.uid)
      {
        const personRef: firebase.database.Reference = firebase.database().ref(`/school/` + data.uid);
        personRef.on('value', personSnapshot => {
          this.schoolProfileData = personSnapshot.val();
        });
      }
    });
  }

  //saveProfile zal de oude data van de user in de database updaten met de nieuwe data
  //In de htmlpagina zit een veiligheid ingebouwd waardoor er geen lege data kan worden doorgegeven
  //Ook wordt saveProfile niet aangeroepen als er geen data aangepast is
  saveProfile(name: string, soort: string, location: string){
    this.afAuth.authState.take(1).subscribe(auth => {
      const personRef: firebase.database.Reference = firebase.database().ref('/school/' + auth.uid);
      personRef.update({
        name,
        soort,
        location,
      });
    });
   
  }

}
