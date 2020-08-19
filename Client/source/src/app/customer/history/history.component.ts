import { Component, OnInit, ViewChild } from "@angular/core";
import { DaterangepickerDirective } from "ngx-daterangepicker-material";
import * as moment from "moment";
import { CustomerService } from "src/app/services/customer.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  @ViewChild('historyTable', { static: true }) historyTable: DatatableComponent;
  transaction: any[];
  type = 1;
  constructor(
    private service: CustomerService,
    private router: Router,
    private ms: ToastrService
  ) {}
  ngOnInit() {
    this.getData();
    // this.submit();
  }

  getData() {
    let body = {
      page: 1,
      limit: 20,
      Type: this.type
    }
    this.service.getTransaction(body).subscribe(res => {
      this.transaction = res.result;
    })
  }
  log() {
    this.getData();
  }

  // ngModelChange(e){
  //   if (e.start){
  //     this. = e.start.format('YYYY-MM-DD');
  //   }
  //   if (e.end){
  //     this.end = e.end.format('YYYY-MM-DD');
  //   }
  //   this.submit();
  // }

  // submit(){
  //   this.body = { begin: this.begin, end: this.end };
  //   this.service
  //     .getListTransaction(this.body)
  //     .subscribe((res: any) => {
  //       this.debitRows = res.debit;
  //       this.tranRows = res.trans;
  //     });
  // }
}
