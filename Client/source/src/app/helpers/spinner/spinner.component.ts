import { Component, OnInit } from "@angular/core";
import { SpinnerService } from "src/app/services/spinner.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent implements OnInit {
  color = "primary";
  mode = "indeterminate";
  value = 50;
  isLoading: Subject<boolean> = this.spinner.isLoading;
  constructor(private spinner: SpinnerService) {}

  ngOnInit() {}
}
