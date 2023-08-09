import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiPath } from 'src/app/core/config/api-path';
import { HttpClientResponse } from 'src/app/core/models/http-response';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Users } from '../../models/users/users';
import { Post } from '../../models/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostManagerService extends HttpService{

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public getDataPostLegal(): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETLEGALPOST}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public getDataPostIllegal(): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETILLEGALPOST}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public getPost(id:any): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETPOSTINFO}/${id}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public softDelete(data : Post): Observable<HttpClientResponse> {
    return this.put(`${ApiPath.SOFTDELETEPOST}`,data).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public recoverPost(data : Post): Observable<HttpClientResponse> {
    return this.put(`${ApiPath.RECOVERPOST}`,data).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }

  public getPostDeleted(): Observable<HttpClientResponse> {
    return this.get(`${ApiPath.GETPOSTDELETED}`).pipe(map((response: HttpClientResponse) => response)) as Observable<HttpClientResponse>;
  }


}
