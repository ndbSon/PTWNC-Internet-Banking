import { Component, OnInit, ViewChild } from "@angular/core";
import { CustomerService } from "src/app/services/customer.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-list-account",
  templateUrl: "./list-account.component.html",
  styleUrls: ["./list-account.component.scss"],
})
export class ListAccountComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: true })
  myFilterTable: DatatableComponent;
  payRows: any[];
  // payCols = [{ prop: "name" }, { name: "Gender" }, { name: "Company" }];
  savingRows: any[];
  // savingCols: [];
  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.service.getListAccount().subscribe((res) => {
      this.payRows = res.paymet;
      this.payRows.map((e) => {
        this.service.postCheckName(12521).subscribe(
          (res) => {
            console.log(res);
          }
        );
      });
      this.savingRows = res.saving;
    });
  }
}
