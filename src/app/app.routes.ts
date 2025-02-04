import { Routes, RouterModule } from '@angular/router';
import { AngularComponent } from './angular/angular/angular.component';
import { ComicComponent } from './comics/comic/comic.component';
import { NgModule } from '@angular/core';
import { RecordComponent } from './records/record/record.component';
import { AddComicComponent } from './comics/add-comic/add-comic.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path: 'home', component: AngularComponent},
    {path: 'comic', component: ComicComponent},
    {path: 'addcomic', component: AddComicComponent},
    {path: 'record', component: RecordComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }