import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth/auth-guard.guard';
import { LoginComponent } from './interfaces/auth/login/login.component';
import { MemberRegisterComponent } from './interfaces/member/member-register/member-register.component';
import { DashboardComponent } from './interfaces/dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { MemberListingComponent } from './interfaces/member/member-listing/member-listing.component';
import { MemberEditComponent } from './interfaces/member/member-edit/member-edit.component';
import { AdminListingComponent } from './interfaces/admin/admin-listing/admin-listing.component';
import { AdminEditComponent } from './interfaces/admin/admin-edit/admin-edit.component';

export const routes: Routes = [
  // /* lazy load components */
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: '', title: 'Dashboard', component: DashboardComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'member-register', title: 'Member Register', component: MemberRegisterComponent, canActivate: [authGuard] },
  { path: 'member-listing', title: 'Member Lists', component: MemberListingComponent, canActivate: [authGuard] },
  { path: 'member-profile/:id', title: 'Member Profile', component: MemberEditComponent, canActivate: [authGuard]},
  { path: 'admin-listing', title: 'Admin Lists', component: AdminListingComponent, canActivate: [authGuard] },
  { path: 'admin-profile/:id', title: 'Admin Profile', component: AdminEditComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }