import { Component, OnInit } from "@angular/core";
import { MustMatch } from "src/app/helpers/functions";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/admin.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: "app-create-info",
  templateUrl: "./create-info.component.html",
  styleUrls: ["./create-info.component.scss"],
})
export class CreateInfoComponent implements OnInit {
  formSubmit: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private ms: ToastrService,
    private router: Router
  ) {}
  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.formSubmit = this.formBuilder.group(
      {
        // Name: null,
        Email: [null, [Validators.email, Validators.required]],
        Password: [null, [Validators.required, Validators.minLength(6)]],
        Phone: null,
        confirmPassword: [null, Validators.required],
      },
      {
        validator: MustMatch("Password", "confirmPassword"),
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    if (this.formSubmit.invalid) {
      return;
    }
    var body = this.formSubmit.value;
    delete body.confirmPassword;
    this.service.postSignup(body).subscribe((res) => {
      if (res) {
        console.log(res);
        this.ms.success('Tạo mới thành công!');
        this.router.navigate(['/admin']);
      } else {
        this.ms.error("Tạo mới thất bại!");
      }
    });
  }
}
