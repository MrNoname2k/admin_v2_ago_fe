import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RightSideBarComponent } from './right-side-bar/right-side-bar.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    RightSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    RightSideBarComponent
  ]
})
export class LayoutsModule { }
