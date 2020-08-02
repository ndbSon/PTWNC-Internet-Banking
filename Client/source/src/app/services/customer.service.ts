import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: "root" })
export class CustomerService {
  constructor(private http: HttpClient) {}

  private readonly url: string = environment.apiUrlBankRsa + "/customer";

  getListAccount() {
    return this.http.get<any>(`${this.url}/account`);
  }
  postChangePw(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  postAddAccountRemind(body) {
    return this.http.post<any>(`${this.url}/addAccountRemind`, body);
  }
  getNameRemind(id) {
    let params = new HttpParams().set("Id", id);
    return this.http.post<any>(`${this.url}/getNameRemind`, {params})
  }
  postDeleteAccountRemind(body) {
    return this.http.post<any>(`${this.url}/changePassword`, body);
  }
  postUpdateAccountRemind(body) {
    return this.http.post<any>(`${this.url}/updateAcountRemind`, body);
  }
  getListAccountRemind() {
    return this.http.get<any>(`${this.url}/account`);
  }
  postTransfer(body) {
    return this.http.post<any>(`${this.url}/tranfers`, body);
  }
  postAddDebit(body) {
    return this.http.post<any>(`${this.url}/addebit`, body);
  }
  postDoneDebit(body) {
    return this.http.post<any>(`${this.url}/donedebit`, body);
  }
  getMyDebits() {
    return this.http.get<any>(`${this.url}/mydebit`);
  }
  getOtherDebits() {
    return this.http.get<any>(`${this.url}/debitother`);
  }
  getTransaction(paging) {
    let params = new HttpParams().set("page", paging.page)
    .set("limit", paging.limit);
    return this.http.get<any>(`${this.url}/transaction`, {params});
  }

  postCheckName(id) {
    let params = new HttpParams().set("Id", id);
    return this.http.get<any>(`${this.url}/listAcountRemind`, { params });
  }
}
