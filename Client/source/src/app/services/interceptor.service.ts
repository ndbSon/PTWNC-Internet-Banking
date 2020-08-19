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
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    public spinner: SpinnerService,
    private authService: AuthService,
    private ms: ToastrService,
    private router: Router
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
        if ((err.error.err === "jwt expired")) {
          this.authService.logout();
          this.router.navigate(["/login"]);
        }
        if (err.error.err === false) {
          return;
        }
        let data = {
          code: err.status,
          message:
            err.error.err || err.error.text ||
            "Có lỗi xảy ra, vui lòng báo cáo cho bộ phận kĩ thuật!",
        };
        this.ms.error(data.message);
        return throwError(err);
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
