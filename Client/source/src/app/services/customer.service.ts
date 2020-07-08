import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: "root" })
export class CustomerService {
  constructor(private http: HttpClient) {}

  private readonly url: string = environment.apiUrlBankRsa + "/customer";

  getListAccount() {
    return this.http.get<any>(`${this.url}/acount`);
  }
  postChangePw(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  postAddAccountRemind(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  postDeleteAccountRemind(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  getListAccountRemind() {
    return this.http.get<any>(`${this.url}/account`);
  }
  postTransfer(body) {
    return this.http.post<any>(`${this.url}/tranfers`, body);
  }
  postAddDebit(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  postDoneDebit(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  getDebit() {
    return this.http.get<any>(`${this.url}/account`);
  }
  getTransaction() {
    return this.http.get<any>(`${this.url}/transaction`);
  }
  
  postCheckName(id) {
    let params = new HttpParams().set("Id", id);
    return this.http.get<any>(`${this.url}/listAcountRemind`, {params});
  }
}
