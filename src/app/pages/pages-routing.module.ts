import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './views/home/home.component';
import { UserManageComponent } from './views/user-manage/user-manage.component';
import { PostManageComponent } from './views/post-manage/post-manage.component';
import { AnnouceComponent } from './views/annouce/annouce.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: HomeComponent, title:'AGO MEDIA - DASHBOARD'},
      { path: '', component: HomeComponent, title:'AGO MEDIA - DASHBOARD'},
      { path: 'users', component:UserManageComponent,title:'AGO MEDIA - USER MANAGEMENT SITE'},
      { path: 'posts', component:PostManageComponent,title:'AGO MEDIA - POST MANAGEMENT SITE'},
      { path: 'announces', component:AnnouceComponent,title:'AGO MEDIA - ANNCOUNCE SITE'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
