import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoutingGuard } from './services/routing-guard.service';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },
  {
    path: 'authentication/login',
    component: LoginComponent,
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [RoutingGuard],
    children: [
      {
        path: 'dashboards/dashboard1',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/login',
  },
];
