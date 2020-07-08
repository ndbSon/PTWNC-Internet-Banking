import { Component, OnInit, ViewChild } from '@angular/core';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: true })
  transaction: any[];
  constructor(
    private service: CustomerService,
    private router: Router,
    private ms: ToastrService) { }
  ngOnInit() {
    // this.submit();
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
