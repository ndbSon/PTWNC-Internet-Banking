import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: "app-view-transactions",
  templateUrl: "./view-transactions.component.html",
  styleUrls: ["./view-transactions.component.scss"],
})
export class ViewTransactionsComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: true })
  myFilterTable: DatatableComponent;
  debitRows: any[];
  tranRows: any[];
  selected1: any;
  total1: number;
  body: {};
  constructor(
    private service: AdminService,
    private router: Router,
    private ms: ToastrService
  ) {}
  begin = "2020-01-20";
  end = "2020-10-20";
  ngOnInit() {
    this.submit();
  }
  ngModelChange(e){
    if (e.start){
      this.begin = e.start.format('YYYY-MM-DD');
    }
    if (e.end){
      this.end = e.end.format('YYYY-MM-DD');
    }
    this.submit();
  }
  
  submit(){
    this.body = { begin: this.begin, end: this.end };
    this.service
      .getListTransaction(this.body)
      .subscribe((res: any) => {
        this.debitRows = res.debit;
        this.tranRows = res.trans;
      });
  }
}
