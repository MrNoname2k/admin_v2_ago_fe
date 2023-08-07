 import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { LoginModelRequest } from '../models/login-model';
import { ApiPath } from 'src/app/core/config/api-path';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{

  constructor(protected override http: HttpClient, private router: Router) {
    super(http);
  }

  public onLogin(data: LoginModelRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(ApiPath.LOGIN, data);
  }

  public doLogout(): void {
    let tokenRemoving = localStorage.removeItem('id_token');

    if (tokenRemoving == null) {
      this.router.navigate(['login']);
    }
  }
}
