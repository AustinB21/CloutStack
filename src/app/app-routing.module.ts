import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { SavedComponent } from './saved/saved.component';
// import { FavoriteService } from './favorite.service';
// import { FrontpageService } from './frontpage.service';


const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'saved', component:  SavedComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/feed', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [FavoriteService, FrontpageService]
})
export class AppRoutingModule { }
