import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";

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
  constructor(
    private service: AdminService,
    private router: Router,
    private ms: ToastrService
  ) {}
  begin: string;
  end: string;
  ngOnInit() {
    this.service
      .getListTransaction({ begin: this.begin, end: this.end })
      .subscribe((res: any) => {
        this.debitRows = res.debit;
        this.tranRows= res.trans;
      });
  }
}
