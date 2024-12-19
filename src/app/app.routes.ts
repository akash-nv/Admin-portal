import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { unAuthGuard } from './core/guards/un-auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: "",
        canActivate: [authGuard],
        loadChildren: () => import('../app/dashboard/dashboard.routes').then(c => c.dashboardRoutes)
    },
    {
        path: "auth",
        canActivate: [unAuthGuard],
        loadComponent: () => import('../app/authentication/authentication.component').then(c => c.AuthenticationComponent),
        children: [
            {
                path: '',
                redirectTo: 'signin',
                pathMatch: 'full'
            },
            {
                path: 'signin',
                loadComponent: () => import('../app/authentication/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'reset-password',
                loadComponent: () => import('../app/authentication/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
            },
            {
                path: 'new-password',
                loadComponent: () => import('../app/authentication/new-password/new-password.component').then(c => c.NewPasswordComponent)
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
