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
import { ListAccountComponent } from './customer/list-account/list-account.component';
import { InfoDetailComponent } from './admin/list-info/info-detail/info-detail.component';
import { InfoEditComponent } from './admin/list-info/info-edit/info-edit.component';

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
    path: "customer",
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "customer/list-account",
    component: ListAccountComponent,
  },
  {
    path: "customer/change-password",
    component: ChangePasswordComponent,
  },
  {
    path: "customer/history",
    component: HistoryComponent,
  },
  {
    path: "customer/list-recipients",
    component: ListRecipientsComponent,
  },
  {
    path: "customer/debit",
    component: DebitComponent,
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
    path: "admin/info-edit/:id",
    component: InfoEditComponent,
  },
  {
    path: "admin/view-transaction",
    component: ViewTransactionsComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
