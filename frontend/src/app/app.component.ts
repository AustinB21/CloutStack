import { Component } from '@angular/core';
import { faCloud, faSearch } from '@fortawesome/free-solid-svg-icons'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'
// import { FrontpageService } from './frontpage.service';
// import { FavoriteService } from './favorite.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  private PHP_API_URL = "http://localhost/Cloutstack/api/login";
  constructor(
    private http: HttpClient, 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router  
  ) {
    this.matIconRegistry.addSvgIcon(
      "new-york-times",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/new-york-times.svg")
    )
  }

  loggedIn(){
    if (localStorage.getItem('username') === 'default'){
      return false;
    }
    return true;
  }

  logout(){
    localStorage.setItem('username', 'default');
    this.http.post<any>(`${this.PHP_API_URL}/logout.php`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/text'
      })
    })
    this.router.navigate(['/login'])
  }
}
