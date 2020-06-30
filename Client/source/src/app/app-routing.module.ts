import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./helpers/auth.guard";
import { LoginComponent } from "./login/login.component";
import { ListInfoComponent } from "./admin/list-info/list-info.component";
import { CreateInfoComponent } from "./admin/create-info/create-info.component";
import { ViewTransactionsComponent } from "./admin/view-transactions/view-transactions.component";

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
    path: "admin",
    component: ListInfoComponent,
    children: [
      {
        path: "create-info",
        component: CreateInfoComponent,
      },
      {
        path: "view-transactions",
        component: ViewTransactionsComponent,
      },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
