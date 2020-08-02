import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/helpers/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  isLoggedIn = false;
  user = new User();
  constructor(private authService: AuthService) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(e => {
      if (e) {
        this.isLoggedIn = true;
        this.user = e;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
}
