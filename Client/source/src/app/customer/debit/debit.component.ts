import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.scss']
})
export class DebitComponent implements OnInit {

  debitRows: any[];
  otherRows: any[];
  begin = "2020-01-20";
  end = "2020-10-20";
  constructor(
    private service: CustomerService
  ) { }

  ngOnInit() {
    this.service.getDebit().subscribe((res: any) => {
      this.otherRows = res.debitother;
      this.debitRows = res.mydebit;
      this.otherRows.map((e) => {
        console.log(e);
        if (e.Done == 0) {
          e.Done = "Chưa thanh toán";
        } else { e.Done = "Đã thanh toán"; }

      })
      this.debitRows.map((e) => {
        console.log(e);
        if (e.Done == 0) {
          e.Done = "Chưa thanh toán";
        } else { e.Done = "Đã thanh toán"; }

      })
    })
  }
}
