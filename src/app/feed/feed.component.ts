import { Component, OnInit } from '@angular/core';

import { FrontpageService } from '../frontpage.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  
  faIcons = {
    faStar,
    faStarOutline
  }

  posts: any[];
  constructor(private frontpageService: FrontpageService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.frontpageService.getPosts()
        .subscribe(posts => this.posts = posts)
  }
}
