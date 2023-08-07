import { Component, OnInit } from '@angular/core';
import { FullUserInfo, UserInfo } from 'src/app/common/models/data-config';
import { NavigatePageService } from 'src/app/core/services/navigate-page/navigate-page.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit{
  admin ?: FullUserInfo;

  constructor(private navigate: NavigatePageService){

  }

  ngOnInit(): void {
    this.admin = JSON.parse(sessionStorage.getItem('profile')!);
  }

  onPageLinkGo(link:any):void {
    window.open(link, '_blank');
  }

  goToPage(page:any){
    this.navigate.navigateToPage(page);
  }
}
