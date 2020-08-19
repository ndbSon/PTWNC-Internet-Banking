import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CustomerService } from "src/app/services/customer.service";
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/helpers/auth.service';

@Component({
  selector: "app-debit",
  templateUrl: "./debit.component.html",
  styleUrls: ["./debit.component.scss"],
})
export class DebitComponent implements OnInit {
  @ViewChild("modalAddDebit", { static: true })
  private modalAddDebit: ElementRef;
  @ViewChild("modalConfirm", { static: true })
  private modalConfirm: ElementRef;
  @ViewChild("modalDelete", { static: true })
  private modalDelete: ElementRef;
  formSubmit: FormGroup;
  currentUser = new User();
  submitted = false;
  data: any;
  dataForDelete: any;
  mind: [];
  others: [];
  OTP = "";
  rightOTP = "";
  reason = "";
  listReminders = [];
  constructor(
    private formBuilder: FormBuilder,
    private service: CustomerService,
    private ms: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}
  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.getListReminders();
    this.formSubmit = this.formBuilder.group({
      Amount: [null, Validators.required],
      Iddebit: [null, Validators.required],
      Content: null,
      Namedebit: [{value: null,  disabled: true}],
      Idreminder: null
    });
    this.getDebitData();
    this.getOtherDebitData();
  }
  setIdValue() {
    this.f.Iddebit.setValue(this.f.Idreminder.value);
  }
  getListReminders(){
    this.service.getListAccountRemind().subscribe(res => {
      this.listReminders = res;
    })

  }
  checkName(){
    if (this.f.Iddebit.value != null) {
      this.service.getNameRemind(this.f.Iddebit.value).subscribe(res => {
        if(res){
          this.f.Namedebit.setValue(res.Name);
        }
      })
    }
  }
  getNameById(id){
    let res =  this.listReminders.filter(e => {
      return e.Idaccount == id;
    })
    return res[0].Name;
  }
  getOtherDebitData() {
    this.service.getOtherDebits().subscribe(res => {
      this.others = res;
    })
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
  }

  removeDebit(row) {
    this.reason = "";
    this.dataForDelete = row;
  }

  deleteMyDebit() {
    let body = {
      Id: this.dataForDelete.Id,
      Reason: this.reason
    }
    this.service.deleteDebit(body).subscribe(res => {
      if (res) {
        this.modalDelete.nativeElement.click();
        this.ms.success("Xóa nhắc nợ thành công");
        this.getDebitData();
      }
    })
  }

  onSubmitModalAddDebit() {
    this.submitted = true;
    if (this.formSubmit.invalid) {
      return;
    }
    let body = this.formSubmit.value;
    delete body.Idreminder;
    this.service.postAddDebit(body).subscribe((res) => {
      if (res) {
        this.ms.success("Thêm thành công");
        this.modalAddDebit.nativeElement.click();
        this.getDebitData();
      }
    });
  }

  sendOTP() {
    let body = {
      Name: this.currentUser.Name,
      email: this.currentUser.email,
    };
    this.service.getOTP(body).subscribe((res) => {
      this.ms.success("Vui lòng kiểm tra mail");
    });
  }
  
  displayConfirmModal(row) {
    this.OTP = "";
    this.data = row;
  }
  doneDebit() {
    let body = {
      Id: this.data.Id,
      Iddebit: this.data.Iddebit
    }
    if ((this.OTP.length == 6))
    {
      this.service.postDoneDebit(body).subscribe(res => {
        if (res.succes){
          this.modalConfirm.nativeElement.click();
          this.ms.success("Thanh toán thành công");
          this.getOtherDebitData();
        }
      })
    }
     else {
      this.ms.error("OTP không đúng, vui lòng kiểm tra lại");
    }
  }
  onFocus() {}

  refresh(id) {
    this.getName(id);
  }

  isBlur(id) {
    if (this.f.Namedebit.value) {
      this.getName(id);
    }
  }

  getName(id) {
    this.service.getNameRemind(id).subscribe((res) => {
      if (res.Name) {
        this.f.Namedebit.setValue(res.Name);
      }
    });
  }
}
