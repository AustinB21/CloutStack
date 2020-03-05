import { Component } from '@angular/core';
import { faCloud, faSearch } from '@fortawesome/free-solid-svg-icons'
// import { FrontpageService } from './frontpage.service';
// import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faIcons = {
    faCloud, 
    faSearch
  }
  title = 'CloutStack';
}
