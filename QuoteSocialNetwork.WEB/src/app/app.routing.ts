import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { AccountDetailsComponent } from './components/account/account-details.component';
import { LoginComponent } from './components/account/login.component';
import { RegistrationFormComponent } from './components/account/registration-form.component';
import {AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'account/details', component: AccountDetailsComponent, canActivate: [AuthGuard]},
    { path: 'register', component: RegistrationFormComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
