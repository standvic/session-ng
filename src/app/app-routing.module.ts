import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  { path: 'feed', loadChildren: './modules/feed/feed.module#FeedModule' },
  /*{ path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'account-settings', loadChildren: './account-settings/account-settings.module#AccountSettingsModule' },*/
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
    data: { showHeader: true, showSidebar: false }
  },
  /*{
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule',
    data: { showHeader: false, showSidebar: false }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
