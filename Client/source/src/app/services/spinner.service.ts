// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from "rxjs";

// @Injectable({
//   providedIn: "root",
// })
// export class SpinnerService {
//   private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
//     false
//   );

//   get isLoading() {
//     console.log(this.loading.asObservable());
//     return this.loading.asObservable();
//   };

//   show() {
//     this.loading.next(true);
//   }
//   hide() {
//     this.loading.next(false);
//   }
// }
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class SpinnerService {
  isLoading = new BehaviorSubject<boolean>(false);
  //notLoading = new BehaviorSubject<boolean>(true);
  show() {
    this.isLoading.next(true);
    //this.notLoading.next(false);
  }
  hide() {
    this.isLoading.next(false);
    //this.notLoading.next(true);
  }
  IsLoading(){
    console.log(this.isLoading.getValue());
    return this.isLoading.getValue();
  }
  // IsNotLoading(){
  //   return this.notLoading.getValue();
  // }
  
}
