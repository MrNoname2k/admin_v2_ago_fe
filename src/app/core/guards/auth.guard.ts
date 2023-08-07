import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogInfoComponent } from 'src/app/common/components/dialog-info/dialog-info.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(
    public router: Router,
    public authService: AuthService,
    public dialog: MatDialog
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('run guard');

      if(sessionStorage.getItem('profile') === null) {
        console.log('run redirect guard')
        this.router.navigate(['login']);
        // this.openDialog('error', 'Access not allowed');
      }
    return true;
  }

  openDialog(type: string, message: string) {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      width: '450px',
      height: 'auto',
      data: {type: type, message: message}
    });


    dialogRef.afterClosed().subscribe(
      res => {
      }
    );
  }

}
