import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherlistPage } from './teacherlist';

@NgModule({
  declarations: [
    TeacherlistPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherlistPage),
  ],
})
export class TeacherlistPageModule {}
