import { Component, OnInit } from '@angular/core';
import { AuthService } from '../helpers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  user = new User();


  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.user = this.validateForm.value;
    this.authService.login(this.user)
  }
}
