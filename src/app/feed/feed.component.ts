import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Tweets, RedditPosts } from '../mock-posts';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { Trend } from '../tweet';
import { ChildData } from '../reddit';
import { containsObject } from '../generalFunctions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  @Input() favorites;
  @Output() favoriteList = new EventEmitter<Array<Trend | ChildData>>();
  faIcons = {
    faStar,
    faStarOutline
  }

  posts = [...Tweets, ...RedditPosts];
  constructor() { }

  ngOnInit(): void {
  }

  onFavorited(data) {
    if(containsObject(data.post, this.favorites)){
      if(!data.isFavorite) {
        this.favorites = this.favorites.filter(article => article !== data.post)
      }
    } else {
      if(data.isFavorite){
        this.favorites.push(data.post)
      }
    }
    this.favoriteList.emit(this.favorites);
  }
}
