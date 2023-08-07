import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigatePageService } from 'src/app/core/service/navigate-page/navigate-page.service';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {

  constructor( public navigatePageService: NavigatePageService) {}

  // loadToPage(page: string) {
  //   this.navigatePageService.navigateToPage(page);
  // }

}
