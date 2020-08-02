import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-debit",
  templateUrl: "./debit.component.html",
  styleUrls: ["./debit.component.scss"],
})
export class DebitComponent implements OnInit {
  @ViewChild("modalAddDebit", { static: true })
  private modalAddDebit: ElementRef;
  formSubmit: FormGroup;
  submitted = false;
  mind: [];
  others: [];
  constructor(
    private formBuilder: FormBuilder,
    private service: CustomerService,
    private ms: ToastrService,
    private router: Router
  ) {}
  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.formSubmit = this.formBuilder.group({
      Amount: [null, Validators.required],
      Iddebit: [null, Validators.required],
      Content: null,
      Namedebit: null,
    });
    this.getDebitData();
  }

  resetModalAddDebit() {
    this.submitted = false;
    this.formSubmit.reset();
  }

  getDebitData() {
    this.service.getMyDebits().subscribe((res) => {
      if (res) {
        this.mind = res;
      }
    });
    this.service.getOtherDebits().subscribe((res) => {
      if (res) {
        this.others = res;
      }
    });
  }

  onSubmitModalAddDebit() {
    this.submitted = true;
    if (this.formSubmit.invalid) {
      return;
    }
    let body = this.formSubmit.value;
    this.service.postAddDebit(body).subscribe((res) => {
      if (res) {
        this.ms.success("Thêm thành công");
        this.modalAddDebit.nativeElement.click();
        this.getDebitData();
      }
    });
  }
}
