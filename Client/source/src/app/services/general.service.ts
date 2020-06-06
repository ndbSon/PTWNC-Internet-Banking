import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient
} from "@angular/common/http";
import { Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GeneralService {
  constructor(protected http: HttpClient) {}
  get requestHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
    //   Authorization: "Bearer " + localStorage.getItem("access_token"),
    //   "Content-Type": "application/json"
    });
    return headers;
  }

  protected get(url: string, options?: any): Observable<any> {
    return this.http
      .get(url, {
        headers: this.requestHeaders,
        ...options
      })
      .pipe();
  }

  protected post(url: string, body?: any, options?: any): Observable<any> {
    return this.http
      .post(url, body, {
        headers: this.requestHeaders,
        ...options
      })
      .pipe();
  }
}
