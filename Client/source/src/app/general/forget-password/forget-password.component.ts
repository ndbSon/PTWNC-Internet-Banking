import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/functions';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  formSubmit: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ms: ToastrService,
    private service: GeneralService
  ) { }
  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {this.formSubmit = this.formBuilder.group(
    {
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, Validators.required],
    },
    {
      validator: MustMatch("newPassword", "confirmPassword"),
    }
  );
  }

  onSubmit() {
    let body = this.formSubmit.value;
    delete body.confirmPassword;
    this.service.forgetPassword(body).subscribe((res) => {
      if (res) {
        this.ms.success("Thay đổi mật khẩu thành công!");
        this.router.navigate(["/"]);
      }
    });
  }

}
