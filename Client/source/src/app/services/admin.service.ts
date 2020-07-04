import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: "root" })
export class AdminService {
  constructor(private http: HttpClient) {}

  url: string = environment.apiUrlBankRsa + "/admin";

  postSignup(body) {
    return this.http.post<any>(`${this.url}/signup`, body);
  }
  postEdit(body) {
    return this.http.post<any>(`${this.url}/update`, body);
  }
  postLock(id) {
    return this.http.post<any>(`${this.url}/lockacount`, { Id: id });
  }
  postUnlock(id) {
    return this.http.post<any>(`${this.url}/openlock`, { Id: id });
  }
  getListTransaction(body) {
    const params = new HttpParams()
      .set("begin", body.begin)
      .set("end", body.end);
    return this.http.get<any>(`${this.url}/transaction`, { params });
  }
  getTransbank(body) {
    return this.http.post<any>(`${this.url}/transbank`, body);
  }
  getListAccount() {
    return this.http.get<any>(`${this.url}/account`);
  }
  getAccount(body) {
    return this.http.get<any>(`${this.url}/detail`, body);
  }
}
