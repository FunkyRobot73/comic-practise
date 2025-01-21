import { Routes, RouterModule } from '@angular/router';
import { AngularComponent } from './angular/angular/angular.component';
import { ComicComponent } from './comics/comic/comic.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path: 'home', component: AngularComponent},
    {path: 'comic', component: ComicComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }