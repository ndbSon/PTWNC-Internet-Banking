import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/helpers/auth.service";
import { User } from "src/app/models/user.model";
import { CustomerService } from "src/app/services/customer.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { GeneralService } from "src/app/services/general.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.scss"],
})
export class TransferComponent implements OnInit {
  @ViewChild("formModal", { static: true }) private formModal: ElementRef;
  formSubmit: FormGroup;
  formAdd: FormGroup;
  currentUser = new User();
  value = "fulltime";
  isInternal = true;
  submitted: boolean = false;
  nameInvalid: boolean = true;
  listReminders = [];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private service: CustomerService,
    private generalService: GeneralService,
    private router: Router,
    private ms: ToastrService
  ) {}

  get f() {
    return this.formSubmit.controls;
  }

  get f1() {
    return this.formAdd.controls;
  }

  ngOnInit() {
    this.getListReminders();
    this.formAdd = this.formBuilder.group({
      Idaccount: [null, Validators.required],
      Name: null,
    });
    this.currentUser = this.authService.currentUserValue;
    this.formSubmit = this.formBuilder.group({
      type: ["in"],
      Amount: null,
      Id: null,
      Content: null,
      Name: [{value: null, disabled: true}],
      token: null,
      charge: null,
      Idreminder: null
    });
  }

  setIdValue() {
    console.log(this.f.Id.value);
    this.f.Id.setValue(this.f.Idreminder.value);
  }
  checkName(){
   if (this.f.Id.value != null) {
    this.service.getNameRemind(this.f.Id.value).subscribe(res => {
      console.log(res);
      if(res){
        this.f.Name.setValue(res.Name);
      }
    })
   }
  }

  getListReminders(){
    this.service.getListAccountRemind().subscribe(res => {
      this.listReminders = res;
    })
  }
  resetForm() {
    this.submitted = false;
    this.formSubmit.reset();
  }
  onAddRecipient() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    if (this.f1.Name.value == null) {
      this.service.getNameRemind(this.f1.Idaccount.value).subscribe(
        (res) => {
          if (res) {
            this.f1.Name.setValue(res.Name);
            this.nameInvalid = false;
            return;
          } else {
            // this.ms.error("Tài khoản không tồn tại, vui lòng kiểm tra lại");
            return;
          }
        },
        (error) => {
          
          // this.ms.error("Tài khoản không tồn tại, vui lòng kiểm tra lại");
        }
      );
    } else {
      let body = this.formAdd.value;
        this.service.postAddAccountRemind(body).subscribe((res) => {
          if (res) {
            this.ms.success("Thêm thành công");
            this.formModal.nativeElement.click();
          }
        });
    }
  }

  getNameById(id){
    let res =  this.listReminders.filter(e => {
      return e.Idaccount == id;
    })
    return res[0].Name;
  }

  onSubmit() {
    let body = this.formSubmit.value;
    body.ToName = this.f.Name.value || this.getNameById(this.f.Id.value);
    delete body.Name;
    delete body.Idreminder;
    delete body.type;
    console.log(body);
    this.service.postTransfer(body).subscribe((res) => {
      if (res) {
        this.ms.success("Chuyển tiền thành công");
        this.router.navigate(["/customer"]);
      } else {
        this.ms.error("Chuyển tiền thất bại");
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
}
