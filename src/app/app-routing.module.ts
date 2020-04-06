import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'auth', component: AuthRoutingModule,
  // },
  {
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then((m) => m.InboxModule),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
