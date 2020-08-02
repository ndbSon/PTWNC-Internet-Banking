import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/helpers/auth.service";
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  // currentUser$: Observable<User>;
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    // if (this.authService.currentUserValue) {
    //   this.isLoggedIn = true;
    //   console.log(this.authService.currentUserValue);
    // }
    
  }

  ngOnInit() {
    // this.currentUser$ = this.authService.currentUser;
    this.authService.currentUser.subscribe(e => {
      if (e) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
}
