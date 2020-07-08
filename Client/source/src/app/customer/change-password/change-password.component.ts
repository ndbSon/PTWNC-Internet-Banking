import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "src/app/helpers/functions";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "src/app/services/customer.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  formSubmit: FormGroup;
  submitted = false;

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
    this.formSubmit = this.formBuilder.group(
      {
        Name: [null, [Validators.required]],
        Password: [null, [Validators.required]],
        confirmPassword: [null, Validators.required],
        token: [null, Validators.required],
      },
      {
        validator: MustMatch("Password", "confirmPassword"),
      }
    );
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    let body = this.formSubmit.value;
    delete body.confirmPassword;
    this.service.postChangePw(body).subscribe((res) => {
      if (res) {
        this.ms.success("Thay đổi mật khẩu thành công!");
        this.router.navigate(["/"]);
      }
    });
  }
}
