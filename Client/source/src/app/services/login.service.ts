import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeneralService } from './general.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService extends GeneralService {

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }
  private readonly _bankRSA: string = environment.apiUrlBankRsa;

  get url() {return this._bankRSA};

  getUser(){
    return this.get(this.url);
  }
  postUser(e: any) {
    return this.post(this.url, e);
  }

}