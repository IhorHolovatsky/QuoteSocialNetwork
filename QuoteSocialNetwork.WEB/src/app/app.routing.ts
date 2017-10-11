import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/account/login.component";
import { RegistrationFormComponent } from "./components/account/registration-form.component";
import { TestComponent } from "./components/test.component";

import {AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/test', component: TestComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationFormComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);