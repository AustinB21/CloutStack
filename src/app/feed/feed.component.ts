import { Component, OnInit } from '@angular/core';
import { Tweets, RedditPosts } from '../mock-posts';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  posts = [...Tweets, ...RedditPosts];
  
  constructor() { }

  ngOnInit(): void {
  }

}
