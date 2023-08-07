import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatePageService {

  constructor(private router : Router) {

  }

  navigateToPage(page : string){
    this.router.navigateByUrl(page);
  }

  goToWeb(link : string){
    (window as any).open(link,"_blank");
  }
}
