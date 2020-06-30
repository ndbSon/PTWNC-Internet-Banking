import { Component, OnInit } from "@angular/core";
import { AuthService } from "./helpers/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "source";
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(
      (x) => (this.isLoggedIn = x != null)
    );
  }
  ngOnInit() {}
}
