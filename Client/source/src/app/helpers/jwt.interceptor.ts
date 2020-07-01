import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private service: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    if (this.service) {
      const currentUser = this.service.currentUserValue;
      const isLoggedIn = currentUser && currentUser.accessToken;
      const isApiUrl = request.url.startsWith(environment.apiUrlBankRsa);
      console.log(isLoggedIn, isApiUrl, isLoggedIn && isApiUrl);
      if (isLoggedIn && isApiUrl) {
        console.log(currentUser.accessToken);
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            "x-access-token": `${currentUser.accessToken}`,
          },
        });
        console.log(1);
      }

      return next.handle(request);
    }

    return next.handle(request);
  }
}
// export class JwtInterceptor implements HttpInterceptor {
//     constructor(private authenticationService: AuthenticationService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // add auth header with jwt if user is logged in and request is to api url
//         const currentUser = this.authenticationService.currentUserValue;
//         const isLoggedIn = currentUser && currentUser.token;
//         const isApiUrl = request.url.startsWith(environment.apiUrl);
//         if (isLoggedIn && isApiUrl) {
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `Bearer ${currentUser.token}`
//                 }
//             });
//         }

//         return next.handle(request);
//     }
// }
