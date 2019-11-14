import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  {
    path: 'support',
    loadChildren: './modules/support/support.module#SupportModule'
  },
  {
    path: 'feed',
    canActivate: [AuthGuard],
    loadChildren: './modules/feed/feed.module#FeedModule'
  },
  {
    path: 'shop',
    canActivate: [AuthGuard],
    loadChildren: './modules/shop/shop.module#ShopModule'
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    loadChildren: './modules/events/events.module#EventsModule'
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: './modules/reports/reports.module#ReportsModule'
  },
  {
    path: 'registration',
    canActivate: [AuthGuard],
    loadChildren: './modules/registration/registration.module#RegistrationModule'
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: './modules/account/account.module#AccountModule'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    data: { showHeader: true, showSidebar: false }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

