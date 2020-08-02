import { Component, OnInit } from "@angular/core";
import { AuthService } from "../helpers/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../models/user.model";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  forgetForm: FormGroup
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  get f() {
    return this.validateForm.controls;
  }

  ngOnInit() {
    this.resetFormLogin();

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  resetFormLogin() {
    this.validateForm = this.fb.group({
      Name: [null, Validators.required],
      Password: [null, Validators.required],
    });
  }

  // resetFormForget(){
  //   this.forgetForm = this.fb.group({
  //     Name: [null, Validators.required],
  //     email: [null, Validators.email, Validators.required],
  //     Password: [null, Validators.required],
  //   });
  // }
  submitForm() {
    this.submitted = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.loading = true;
    this.authService
      .login(this.f.Name.value, this.f.Password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (this.authService.currentUserValue) {
            if (this.authService.currentUserValue.permission == 1) {
              this.router.navigate(['customer']);
            } else if (this.authService.currentUserValue.permission == 2) {
              this.router.navigate(['employee']);
            } else {
              this.router.navigate(['admin']);
            }
          }
        },
        (error) => {
          this.error = error;
          console.log(this.error);
          this.loading = false;
        }
      );
  }
}
