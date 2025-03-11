import { Routes, RouterModule } from '@angular/router';
import { AngularComponent } from './angular/angular/angular.component';
import { ComicComponent } from './comics/comic/comic.component';
import { NgModule } from '@angular/core';
import { RecordComponent } from './records/record/record.component';
import { AddComicComponent } from './comics/add-comic/add-comic.component';
import { AddCompanyComponent } from './comics/add-company/add-company.component';
import { AddCharacterComponent } from './comics/add-character/add-character.component';
import { AddBlogComponent } from './comics/add-blog/add-blog.component';

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch: 'full'},
    {path: 'home', component: AngularComponent},
    {path: 'comic', component: ComicComponent},
    {path: 'addcomic', component: AddComicComponent},
    {path: 'addcompany', component: AddCompanyComponent},
    {path: 'addcharacter', component: AddCharacterComponent},
    {path: 'record', component: RecordComponent},
    {path: 'addblog', component: AddBlogComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }