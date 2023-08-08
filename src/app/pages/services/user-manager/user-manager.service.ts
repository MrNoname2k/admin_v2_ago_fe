import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Users } from '../../models/users/users';

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

  public getUser(id:any): Observable<HttpClientResponse> {
    console.log(`${ApiPath.GETUSERINFO}`);
    return this.get(`${ApiPath.USERMANGER}/${id}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }
  public updateUser(data : Users): Observable<HttpClientResponse> {
    return this.put(`${ApiPath.UPDATEUSER}`,data).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public softDelete(data : Users): Observable<HttpClientResponse> {
    return this.put(`${ApiPath.SOFTDELETE}`,data).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public recoverUser(data : Users): Observable<HttpClientResponse> {
    return this.put(`${ApiPath.RECOVERUSER}`,data).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public getUsersDeleted(): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETUSERSDELETED}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }


}
