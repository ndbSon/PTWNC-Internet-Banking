import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../helpers/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GeneralService {
  constructor(protected http: HttpClient, private service: AuthService) {}

  private readonly url: string = environment.apiUrlBankRsa + "/user";
  private readonly url_local: string = environment.apiUrlLocal + "/user";
  
  sendRefreshToken() {
    let header = new HttpHeaders().set("x-access-token", "");
    let body = {
      accessToken: this.service.currentUserValue.accessToken,
      refreshToken: this.service.currentUserValue.refreshToken,
    };
    return this.http.post<any>(`${this.url}/refreshToken`, body, {
      headers: header,
    });
  }

  postOTP(body) {
    let header = new HttpHeaders().set("x-access-token", "");

    return this.http.post<any>(`${this.url_local}/sendotp`, body, {
      headers: header,
    });
  }

  forgetPassword(body) {
    let header = new HttpHeaders().set("x-access-token", "");

    return this.http.post<any>(`${this.url}/forgetPassword`, body, {
      headers: header,
    });
  }
}
