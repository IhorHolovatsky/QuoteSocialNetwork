import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MaterializeModule } from 'ng2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/account/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationFormComponent } from './components/account/registration-form.component';
import { TestComponent } from './components/test.component';
import { routing } from './app.routing';

import { UserService } from './services/user.service';
import { AuthGuard} from './auth.guard';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    TestComponent, 
    LoginComponent, 
    RegistrationFormComponent, 
    NavbarComponent,
  ],
  entryComponents: [  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpModule, 
    BrowserAnimationsModule, routing, 
    MaterializeModule.forRoot(), 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, 
              UserService, 
              AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
