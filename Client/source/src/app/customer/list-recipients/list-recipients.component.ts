import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-list-recipients",
  templateUrl: "./list-recipients.component.html",
  styleUrls: ["./list-recipients.component.scss"],
})
export class ListRecipientsComponent implements OnInit {
  @ViewChild("formModal", { static: true }) private formModal: ElementRef;
  formSubmit: FormGroup;
  submitted = false;
  listReminders = [];
  isEdited = false;
  nameInvalid = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ms: ToastrService,
    private service: CustomerService
  ) {}
  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.formSubmit = this.formBuilder.group({
      Idaccount: [null, Validators.required],
      Name: null,
    });
    this.getData();
  }
  getData() {
    this.service.getListAccountRemind().subscribe((res) => {
      if (res) {
        this.listReminders = res;
      }
    });
  }
  resetForm() {
    this.submitted = false;
    this.formSubmit.reset();
  }
  onSubmit() {
    this.submitted = true;
    if (this.formSubmit.invalid) {
      return;
    }
    if (this.f.Name.value == null) {
      console.log(1);
      this.service.getNameRemind(this.f.Idaccount.value).subscribe(
        (res) => {
          if (res) {
            this.f.Name.setValue(res.Name);
            this.nameInvalid = false;
            return;
          } else {
            this.ms.error("Tài khoản không tồn tại, vui lòng kiểm tra lại");
            return;
          }
        },
        (error) => {
          console.log("1,3");
          this.ms.error(error);
        }
      );
    } else {
      let body = this.formSubmit.value;
      if (this.isEdited) {
        this.service.postUpdateAccountRemind(body).subscribe((res) => {
          if (res) {
            this.ms.success("Chỉnh sửa thành công");
            this.formModal.nativeElement.click();
            this.getData();
          }
        });
      } else {
        this.service.postAddAccountRemind(body).subscribe((res) => {
          if (res) {
            this.ms.success("Thêm thành công");
            this.getData();
          }
        });
      }
    }
  }

  editRecipient(row) {
    this.isEdited = true;
    this.formSubmit.patchValue({
      Idaccount: row.Idaccount,
      Name: row.Name,
    });
    this.formModal.nativeElement.click();
  }

  deleteRecipient(id) {
    let body = { Idaccount: id };
    this.service.postDeleteAccountRemind(body).subscribe((res) => {
      this.getData();
      this.ms.success("Xóa thành công");
    });
  }
}
