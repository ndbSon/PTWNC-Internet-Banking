import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/helpers/auth.service";
import { User } from "src/app/models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user = new User();
  loading = false;
  currentUser: User;
  // userFromApi: User;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
