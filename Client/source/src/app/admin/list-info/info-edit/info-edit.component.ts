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
  id: number;
  constructor(
    private route: ActivatedRoute,
    private service: AdminService,
    private ms: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.id = this.route.snapshot.params["id"];
  }

  get f() {
    return this.formSubmit.controls;
  }
  ngOnInit() {
    this.formSubmit = this.formBuilder.group({
      Name: null,
      Email: [null, [Validators.email, Validators.required]],
      Phone: null
    });

    // this.service.getAccount({"Id": this.id}).subscribe((res) => {
    //   if (res) {
    //     this.formSubmit.patchValue({
    //       Name: res.Name,
    //       Email: res.Email
    //     })
    //   } else {
    //   }
    // });
  }
  onSubmit() {
    var body = this.formSubmit.value;
    this.service.postEdit(body).subscribe((res) => {
      if (res) {
        this.ms.success("Chỉnh sửa thành công!");
        this.router.navigate(["/admin"]);
      } else {
        this.ms.error("Chỉnh sửa thất bại!");
      }
    });
  }
}
