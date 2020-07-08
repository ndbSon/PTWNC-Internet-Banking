import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./helpers/auth.guard";
import { LoginComponent } from "./login/login.component";
import { ListInfoComponent } from "./admin/list-info/list-info.component";
import { CreateInfoComponent } from "./admin/create-info/create-info.component";
import { ViewTransactionsComponent } from "./admin/view-transactions/view-transactions.component";
import { CustomerComponent } from "./customer/customer.component";
import { ChangePasswordComponent } from "./customer/change-password/change-password.component";
import { HistoryComponent } from "./customer/history/history.component";
import { ListRecipientsComponent } from "./customer/list-recipients/list-recipients.component";
import { DebitComponent } from "./customer/debit/debit.component";
import { TransferComponent } from "./customer/transfer/transfer.component";
import { ListAccountComponent } from "./customer/list-account/list-account.component";
import { InfoEditComponent } from "./admin/list-info/info-edit/info-edit.component";
import { EmployeeComponent } from "./employee/employee.component";
import { CreateAccountComponent } from "./employee/create-account/create-account.component";
import { TransactionHistoryComponent } from "./employee/transaction-history/transaction-history.component";
import { TopupComponent } from "./employee/topup/topup.component";
import { RemoveDebitComponent } from "./customer/debit/remove-debit/remove-debit.component";
import { CreateDebitComponent } from "./customer/debit/create-debit/create-debit.component";
import { ForgetPasswordComponent } from './general/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent,
  },
  {
    path: "customer",
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "customer/list-account",
    component: ListAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "customer/change-password",
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "customer/history",
    component: HistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "customer/list-recipients",
    component: ListRecipientsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "customer/debit",
    component: DebitComponent,
  },
  {
    path: "customer/debit/create-debit",
    component: CreateDebitComponent,
  },
  {
    path: "customer/debit/remove-debit",
    component: RemoveDebitComponent,
  },
  {
    path: "customer/transfer",
    component: TransferComponent,
  },

  {
    path: "admin",
    component: ListInfoComponent,
  },
  {
    path: "admin/create",
    component: CreateInfoComponent,
  },
  {
    path: "admin/info-edit/:id",
    component: InfoEditComponent,
  },
  {
    path: "admin/view-transaction",
    component: ViewTransactionsComponent,
  },
  {
    path: "employee",
    component: EmployeeComponent,
  },
  {
    path: "employee/create",
    component: CreateAccountComponent,
  },
  {
    path: "employee/top-up",
    component: TopupComponent,
  },
  {
    path: "employee/transaction-history",
    component: TransactionHistoryComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
