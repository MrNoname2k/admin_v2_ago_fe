import { Component, OnInit } from '@angular/core';
import { NavigatePageService } from './core/services/navigate-page/navigate-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private routerRedirect: NavigatePageService){

  }
  ngOnInit(): void {
    if(sessionStorage.getItem('admin_token') === null){
      this.routerRedirect.navigateToPage('login');
    }
  }
  title = 'Ago Social Administrator';
}
