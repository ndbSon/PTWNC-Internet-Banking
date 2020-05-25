import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private user: BehaviorSubject<User> = new BehaviorSubject<User>({username: '', password: ''});

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUser(){
    return this.user;
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.username !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.currentUser.next({username: user.username, password: user.password});
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}