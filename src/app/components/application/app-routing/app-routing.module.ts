import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { AuthGuard } from '../guards/auth.guard';

const childRoutes : Routes =  [
  {
    path: 'dashboard',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'details',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../../details/details.module').then(m => m.DetailsModule)
  },
  {
    path: 'manager',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('../../user-manager/user-manager.module').then(m => m.UserManagerModule)
  }
]

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: childRoutes
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
