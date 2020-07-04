import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: HttpClient) { }

    url: string = environment.apiUrlBankRsa + "/customer";

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
        return this.http.post<any>(`${this.url}/changePassword`, body);
    }
    postAddDebit(body) {
        return this.http.post<any>(`${this.url}/changePassword`, body);
    }
    postDoneDebit(body) {
        return this.http.post<any>(`${this.url}/changePassword`, body);
    }
    getDebit() {
        return this.http.get<any>(`${this.url}/debit`);
    }
    getTransaction() {
        return this.http.get<any>(`${this.url}/account`);
    }

}