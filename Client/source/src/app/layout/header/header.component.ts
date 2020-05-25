import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/helpers/auth.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user = new User();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((res) => {
      console.log(res);
      this.user = res;
    });
  }
  logOut() {
    this.authService.logout();
  }
}
