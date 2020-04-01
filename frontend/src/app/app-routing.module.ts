import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SavedComponent } from './saved/saved.component';



const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'saved', component:  SavedComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/feed', pathMatch: 'full'}
];

@NgModule({

  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule, CommonModule],
  exports: [RouterModule]

})
export class AppRoutingModule { }