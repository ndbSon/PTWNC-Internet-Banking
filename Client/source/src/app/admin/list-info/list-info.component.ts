import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-list-info",
  templateUrl: "./list-info.component.html",
  styleUrls: ["./list-info.component.scss"],
})
export class ListInfoComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: true })
  myFilterTable: DatatableComponent;
  accRows: any[];
  constructor(
    private service: AdminService,
    private router: Router,
    private ms: ToastrService
  ) {}

  ngOnInit() {
    this.service.getListAccount().subscribe((res) => {
      this.accRows = res;
      // this.accRows.map((e) => {
      //   if (e.Permission == 1) {
      //     e.Permission = "Khách hàng";
      //   } else if (e.Permission == 2) {
      //     e.Permission = "Nhân viên";
      //   } else {
      //     e.Permission = "Admin";
      //   }
      // });
      this.accRows = this.accRows.filter((e) => {
        return e.Permission === 2;
      });
      this.accRows.map(e => {
        e.Permission = "Nhân viên";
      });
    });
  }

  lock(id) {
    this.service.postLock(id).subscribe((res) => {
      if (res) {
        this.ms.success("Khóa thành công");
        this.router.navigate(["/admin"]);
      } else {
        this.ms.error("Khóa thất bại");
      }
    });
  }
  unlock(id) {
    this.service.postUnlock(id).subscribe((res) => {
      if (res) {
        this.ms.success("Mở khóa thành công");
        this.router.navigate(["/admin"]);
      } else {
        this.ms.error("Mở khóa thất bại");
      }
    });
  }
  edit(body) {}
  create() {}
  view(body) {}
}
