import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout'
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';

import { EmailValidationDirective } from './email-validation.directive';

import { PostComponent } from './post/post.component';
import { SavedComponent } from './saved/saved.component';
import { FrontpageService } from './frontpage.service';
import { FavoriteService } from './favorite.service';
import { SignupComponent } from './signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from './filter/filter.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';



@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LoginComponent,
    EmailValidationDirective,
    PostComponent,
    SavedComponent,
    SignupComponent,
    FilterComponent,
    RadiobuttonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [FrontpageService, FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
