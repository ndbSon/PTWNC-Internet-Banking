import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "src/app/helpers/functions";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  formSubmit: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.formSubmit = this.formBuilder.group(
      {
        oldPassword: [null, [Validators.required, Validators.minLength(6)]],
        newPassword: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, Validators.required],
      },
      {
        validator: MustMatch("newPassword", "confirmPassword"),
      }
    );
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formSubmit.invalid) {
      return;
    }

    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.formSubmit.value));
  }
}
