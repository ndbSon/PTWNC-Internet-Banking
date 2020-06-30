import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import { SpinnerService } from "./spinner.service";
import { AuthService } from "../helpers/auth.service";
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    public spinner: SpinnerService,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        let data = {
          code: err.status,
          message:
            err.error ||
            "Có lỗi xảy ra, vui lòng báo cáo cho bộ phận kĩ thuật!",
        };
        this.authService.logout();
        location.reload(true);
        // this.message.error(data.message);
        return throwError(err);
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
