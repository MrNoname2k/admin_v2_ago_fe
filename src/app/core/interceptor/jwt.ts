import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// import { AuthService } from "src/app/auth/services/auth.service";

@Injectable()
export class JsonTokenWebInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  public intercept(request: HttpRequest<any> , next: HttpHandler) {
    const authToken = JSON.parse(sessionStorage.getItem('admin_token')!);
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    })

    return next.handle(request);
  }

}
