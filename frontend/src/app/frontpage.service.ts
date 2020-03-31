import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tweets, RedditPosts } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  private RSS_URL = 'https://gadgets.ndtv.com/rss/feeds';


  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return of([...Tweets, ...RedditPosts])
  }
}

