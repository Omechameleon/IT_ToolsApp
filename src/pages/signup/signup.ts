import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  //signupData bevat de standaarddata waarmee we een profiel aanmaken
  signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };

  //profileData bevat enkel TorS en staat apart omdat deze data bepaalt of het om een leerkracht of een school gaat
  profileData = {
    TorS: ''
  };

  //teacherProfileData bevat dummydata waarmee we de database mogelijk vullen voor dit profiel, dit kan de user later aanpassen
  teacherProfileData = {
    name: 'Je voornaam & naam',
    age: 'Je leeftijd',
    location: 'Je woonplaats',
    classes: 'De vakken die je geeft',
    about: 'Over jezelf',
    TorS: 'teacher'
  };

  //schoolProfileData bevat dummydata waarmee we de database mogelijk vullen voor dit profiel, dit kan de user later aanpassen
  schoolProfileData = {
    name: 'De schoolnaam',
    location: 'Schooladres',
    soort: 'Bijvoorbeeld lagere of middelbare school',
    TorS: 'school'
  };

  //Deze data vergemakkelijkt het schrijven van het databasepad later
  torsData = {
    teacherBranch : "/teacher/",
    schoolBranch : "/school/"
  };

  constructor(private nativePageTransitions: NativePageTransitions, 
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController) {
    this.signupData.email = this.navParams.get('email');
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
   
  //Deze signupfunctie maakt de gebruiker aan in de database indien er aan bepaalde voorwaarden is voldaan
  signup() {
    
    //We checken hier of de user correct tweemaal hetzelfde paswoord heeft ingegeven.
    if(this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Foutmelding',
        message: 'De ingegeven wachtwoorden komen niet overeen!',
	      buttons: ['OK']
      });
      alert.present();
      return;
    }

    //Hier checken we of de user een leerkracht of school is en maken hem/haar aan in de correcte databasetabel/-branch
    //Hiervoor hebben we twee verschillende functies voor een leerkracht en school respectievelijk
    this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
        .then(auth => {
          if(this.profileData.TorS == "teacher"){
          this.saveTeacherProfile(this.teacherProfileData.name, this.teacherProfileData.age, this.teacherProfileData.location, this.teacherProfileData.classes, this.teacherProfileData.about, this.teacherProfileData.TorS, auth.uid, this.torsData.teacherBranch);
          }
          else if(this.profileData.TorS == "school"){
          this.saveSchoolProfile(this.schoolProfileData.name, this.schoolProfileData.location, this.schoolProfileData.soort,this.schoolProfileData.TorS, auth.uid, this.torsData.schoolBranch);
          }
        })
        .catch(err => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            message: "Er liep iets mis bij het aanmaken van uw profiel. Gelieve uw internetverbinding te controleren en opnieuw te proberen.",
            buttons: ['OK']
          });
          alert.present();
        });

        //Nadat we de user hebben aangemaakt loggen we deze meteen in vanwege gebruiksvriendelijkheid
          this.afAuth.auth.signInWithEmailAndPassword(this.signupData.email, this.signupData.password)
          .then(auth =>{
          })
          .catch(err =>{
            let toast = this.toastCtrl.create({
              message: err.message,
              duration: 5000
            });
            toast.present();
          });
      }


      //Deze functie maakt de user als leerkracht aan in de database
      saveTeacherProfile(name: string, age: string, location: string, classes: string, about: string, TorS: string, auth: string, branch: string): void {
          const personRef: firebase.database.Reference = firebase.database().ref(branch + auth);
          personRef.update({
            name,
            age,
            location,
            classes,
            about,
            TorS,
            auth
          });
      }

      //Deze functie maakt de user als school aan in de database
      saveSchoolProfile(name: string, location: string, soort: string, TorS: string, auth: string, branch: string): void {
        const personRef: firebase.database.Reference = firebase.database().ref(branch + auth);
        personRef.update({
          name,
          location,
          soort,
          TorS,
          auth
        });
    }
}
