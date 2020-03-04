import { Component } from '@angular/core';
import { faCloud, faSearch } from '@fortawesome/free-solid-svg-icons'

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
  favorites = []
  onChangeFavorites(favorites):void {
    this.favorites = favorites
  }
}
