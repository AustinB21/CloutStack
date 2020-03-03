import { Component, OnInit } from '@angular/core';
import { Tweets, RedditPosts } from '../mock-posts';
import { faTwitter, faReddit, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts = [...Tweets, ...RedditPosts];
  faIcons = {
    faTwitter,
    faReddit,
    faStar,
    faStarOutline
  }
  constructor() { }

  ngOnInit(): void {
  }

}
