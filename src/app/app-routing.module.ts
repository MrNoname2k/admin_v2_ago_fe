import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)},
  { path: '*', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
