import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private PHP_API_URL = "http://localhost/Cloutstack/api/favorites";

  constructor(private http: HttpClient) { }

  getFavorites() {
    return this.http.get<any>(`${this.PHP_API_URL}/read.php`)
  }

  addFavorite(post: any){
    return this.http.post<any>(`${this.PHP_API_URL}/insert.php`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  deleteFavorite(post: any) {
    return this.http.post<any>(`${this.PHP_API_URL}/delete.php`, post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
