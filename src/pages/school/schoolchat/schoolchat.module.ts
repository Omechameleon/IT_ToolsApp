import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolchatPage } from './schoolchat';

@NgModule({
  declarations: [
    SchoolchatPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolchatPage),
  ],
})
export class SchoolchatPageModule {}
