import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherchatPage } from './teacherchat';

@NgModule({
  declarations: [
    TeacherchatPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherchatPage),
  ],
})
export class TeacherchatPageModule {}
