import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolhomePage } from './schoolhome';

@NgModule({
  declarations: [
    SchoolhomePage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolhomePage),
  ],
})
export class SchoolhomePageModule {}
