import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

import { FrontpageService } from '../frontpage.service';

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
  column = "col-4"

  posts: any[];
  constructor(private frontpageService: FrontpageService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
      this.breakpointObserver
      .observe(['(max-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if(state.matches) {
          this.column = "col-12"
        } else {
          this.column = "col-4"
        }
      })
      this.getPosts();
  }

  getPosts(): void {
    this.frontpageService.getPosts()
        .subscribe(posts => {
          this.posts = posts
          // console.log(posts)
        })
  }
}
