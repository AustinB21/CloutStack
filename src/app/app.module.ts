import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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



@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LoginComponent,
    EmailValidationDirective,
    PostComponent,
    SavedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FrontpageService, FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
