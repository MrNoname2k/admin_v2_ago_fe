import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserManageComponent } from './views/user-manage/user-manage.component';
import { PostManageComponent } from './views/post-manage/post-manage.component';
import { AnnouceComponent } from './views/annouce/annouce.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    LoginComponent,
    UserManageComponent,
    PostManageComponent,
    AnnouceComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    NgApexchartsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class PagesModule { }
