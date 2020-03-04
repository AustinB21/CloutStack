import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Tweets, RedditPosts } from '../mock-posts';
import { Trend } from '../tweet';
import { ChildData } from '../reddit';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  @Output() favoriteList = new EventEmitter<Array<Trend | ChildData>>();
  posts = [...Tweets, ...RedditPosts];
  favorites = [];  
  constructor() { }

  ngOnInit(): void {
  }

  onFavorited(data) {
    if(this.containsObject(data.post, this.favorites)){
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
  private containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
  }
}
