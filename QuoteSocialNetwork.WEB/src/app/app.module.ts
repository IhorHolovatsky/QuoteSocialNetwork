import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule , AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RestangularModule } from 'ngx-restangular';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/account/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationFormComponent } from './components/account/registration-form.component';
import { routing } from './app.routing';
import { UserService } from './services/user.service';
import { AuthGuard} from './auth.guard';
import { environment } from '../environments/environment';
import { AccountDetailsComponent } from './components/account/account-details.component';
import { QuotesModule } from './components/quotes/quotes.module';
import { RestangularConfigFactory } from './shared/restangular-config';
import { GroupsModule } from './components/groups/groups.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationFormComponent,
    NavbarComponent, AccountDetailsComponent
  ],
  entryComponents: [  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpModule,
    BrowserAnimationsModule, routing,
    MaterializeModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    QuotesModule,
    GroupsModule,
    RestangularModule.forRoot([Router, AngularFireAuth], RestangularConfigFactory),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [Http]
      }
  })
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },
              UserService,
              AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
