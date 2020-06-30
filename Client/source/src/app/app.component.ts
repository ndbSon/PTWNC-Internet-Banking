import { Component, OnInit } from "@angular/core";
import { AuthService } from "./helpers/auth.service";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "source";
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(
      (x) => (this.isLoggedIn = x != null)
    );
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }
  ngOnInit() {}
}
