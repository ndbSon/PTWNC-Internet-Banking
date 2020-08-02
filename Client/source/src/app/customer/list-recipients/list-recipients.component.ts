import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: "app-list-recipients",
  templateUrl: "./list-recipients.component.html",
  styleUrls: ["./list-recipients.component.scss"],
})
export class ListRecipientsComponent implements OnInit {
  @ViewChild('formModal', {static: true}) private formModal: ElementRef;
  formSubmit: FormGroup;
  submitted = false;
  payRows = [];
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
        Idacount: [null, Validators.required],
        Name: null,
      }
    );
    this.getData();
  }
  getData(){
    this.service.getListAccountRemind().subscribe(res => {
      // get list người nhận
    })
  }
  resetForm() {
    this.submitted = false;
    this.formSubmit.reset();
  }
  onSubmit() {
    this.submitted = true;
    if (this.formSubmit.invalid) {
      return;
    }
    if (this.f.Name.value == null) {
      // this.service.
      // get name default
      
    }
    this.formModal.nativeElement.click();
    let body = this.formSubmit.value;
    this.service.postAddAccountRemind(body).subscribe((res) => {
      if (res) {
        this.ms.success("Thêm thành công");
        this.getData;
      }
    });
  }
}
