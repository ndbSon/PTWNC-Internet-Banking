import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import * as jwt_decode from "jwt-decode";

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(Name: string, Password: string) {
    return this.http
      .post<any>(`${environment.apiUrlBankRsa}/user/login`, {
        Name: Name,
        Password: Password,
      })
      .pipe(
        map((res) => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          if (res.accessToken) {
            let decoded = jwt_decode(res.accessToken);
            let currentUser: User = {
              Name: Name,
              iat: decoded.iat,
              exp: decoded.exp,
              userId: decoded.userId,
              permission: decoded.Permission,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken
            };
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
            return currentUser;
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}