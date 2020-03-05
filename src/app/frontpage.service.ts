import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Tweets, RedditPosts } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class FrontpageService {

  constructor() { }

  getPosts(): Observable<any[]> {
    return of([...Tweets, ...RedditPosts])
  }
}

