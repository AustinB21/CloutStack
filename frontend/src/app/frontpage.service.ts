import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {
  PHP_RSS_SERVER = "http://localhost/Cloutstack/rss";
  posts: any[];

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any>(`${this.PHP_RSS_SERVER}/read.php`)
  }
}

