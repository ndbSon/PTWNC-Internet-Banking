import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { SpinnerComponent } from "./helpers/spinner/spinner.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { CreateInfoComponent } from "./admin/create-info/create-info.component";
import { ListInfoComponent } from "./admin/list-info/list-info.component";
import { ViewTransactionsComponent } from "./admin/view-transactions/view-transactions.component";
import { CreateAccountComponent } from "./employee/create-account/create-account.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SpinnerService } from "./services/spinner.service";
import { AuthInterceptorService } from "./services/interceptor.service";
import { AuthGuard } from "./helpers/auth.guard";
import { JwtInterceptor } from "./helpers/jwt.interceptor";
import { ChangePasswordComponent } from "./customer/change-password/change-password.component";
import { ListAccountComponent } from "./customer/list-account/list-account.component";
import { ListRecipientsComponent } from "./customer/list-recipients/list-recipients.component";
import { TransferComponent } from "./customer/transfer/transfer.component";
import { DebitComponent } from "./customer/debit/debit.component";
import { HistoryComponent } from "./customer/history/history.component";
import { TransactionHistoryComponent } from "./employee/transaction-history/transaction-history.component";
import { CustomerComponent } from "./customer/customer.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ToastrModule } from "ngx-toastr";
import { InfoEditComponent } from './admin/list-info/info-edit/info-edit.component';
import { EmployeeComponent } from './employee/employee.component';
import { TopupComponent } from './employee/topup/topup.component';
import { CreateDebitComponent } from './customer/debit/create-debit/create-debit.component';
import { RemoveDebitComponent } from './customer/debit/remove-debit/remove-debit.component';
import { ForgetPasswordComponent } from './general/forget-password/forget-password.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    CreateInfoComponent,
    ListInfoComponent,
    ViewTransactionsComponent,
    CreateAccountComponent,
    SpinnerComponent,
    ChangePasswordComponent,
    ListAccountComponent,
    ListRecipientsComponent,
    TransferComponent,
    DebitComponent,
    HistoryComponent,
    TransactionHistoryComponent,
    CustomerComponent,
    InfoEditComponent,
    EmployeeComponent,
    TopupComponent,
    CreateDebitComponent,
    RemoveDebitComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
  ],
  exports: [],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}