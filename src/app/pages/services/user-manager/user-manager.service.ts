import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService extends HttpService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public getDataUser(): Observable<HttpClientResponse> {
    console.log(`${ApiPath.USERMANGER}`);
    return this.get(`${ApiPath.USERMANGER}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }
}
