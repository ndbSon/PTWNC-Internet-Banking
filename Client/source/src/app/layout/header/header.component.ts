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
  isCustomer = false;
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(e => {
      if (e) {
        this.isLoggedIn = true;
        this.user = e;
        if (e.permission === 1) {
          this.isCustomer = true;
        } else {
          this.isCustomer = false;
        }
      } else {
        this.isLoggedIn = false;
      }
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
