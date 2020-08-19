import { Component, OnInit } from "@angular/core";
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
  formSubmit: FormGroup;
  body: any;
  currentUser = new User();
  value = "fulltime";
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

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.formSubmit = this.formBuilder.group({
      type: null,
      Amount: null,
      Id: null,
      Content: null,
      token: null,
      charge: null,
    });
    // this.f.Id.valueChanges.subscribe((res) => {
    //   if (this.formSubmit.get("Id").touched) {
    // this.service.postCheckName(res).subscribe((r) => {
    //   console.log(r);
    // });
    //   }
    // });
    // setTimeout(() => {
    //   this.f.Id.valueChanges.subscribe((res) => {
    //     if (this.f.Id.untouched) {

    //     }
    //   });
    // }, 4000);
  }

  // onBlurTest(e) {
  //   this.service.postCheckName(this.f.Id).subscribe(
  //     (r) => {
  //       console.log(r);
  //     },
  //     (e) => {
  //       console.log(e);
  //     }
  //   );
  // }

  onSubmit() {
    this.body = this.formSubmit.value;
    this.service.postTransfer(this.body).subscribe((res) => {
      if (res) {
        this.ms.success("Chuyển tiền thành công");
        this.router.navigate(["/customer"]);
      } else {
        this.ms.error("Chuyển tiền thất bại");
      }
    });
  }

  sendOTP() {
    let bo = {
      Name: this.currentUser.Name,
      gmail: this.currentUser.Email,
    };
    this.generalService.postOTP(bo).subscribe((res) => {
      console.log(res);
    });
  }
}
