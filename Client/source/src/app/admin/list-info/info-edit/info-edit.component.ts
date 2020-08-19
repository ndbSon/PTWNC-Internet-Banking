import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-info-edit",
  templateUrl: "./info-edit.component.html",
  styleUrls: ["./info-edit.component.scss"],
})
export class InfoEditComponent implements OnInit {
  formSubmit: FormGroup;
  submitted =  false;
  Id: string;
  constructor(
    private formBuilder: FormBuilder,
    private service: AdminService,
    private ms: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.Id = this.route.snapshot.params["id"];
    this.formSubmit = this.formBuilder.group(
      {
        // Name: null,
        Email: [null, [Validators.email, Validators.required]],
        Phone: null
      }
    );
    this.service.getAccount(this.Id).subscribe(res => {
      if (res.Name) {
        this.formSubmit.patchValue({
          // Name: res.Name,
          Email: res.Email,
          Phone: res.Phone
        })
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.formSubmit.invalid) {
      return;
    }
    var body = this.formSubmit.value;
    console.log(body);
    delete body.confirmPassword;
    body.Id = this.Id;
    this.service.postEdit(body).subscribe((res) => {
      if (res) {
        console.log(res);
        this.ms.success('Chỉnh sửa thành công!');
        this.router.navigate(['/admin']);
      } else {
        this.ms.error("Chỉnh sửa thất bại!");
      }
    });
  }
}
