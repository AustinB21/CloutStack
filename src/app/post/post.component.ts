import { Component, OnInit, Input } from '@angular/core';

import { faTwitter, faReddit } from '@fortawesome/free-brands-svg-icons';
import { Trend } from '../data/tweet';
import { ChildData } from '../data/reddit';

import { FavoriteService } from '../favorite.service';
import { Subscription } from 'rxjs';
import { containsObject } from '../generalFunctions';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Input() faIcon;
  @Input() faIconOutline;
  @Input() action: string;
  
  private subscription: Subscription;

  faIcons = {
    faTwitter,
    faReddit
  }

  faDefault = null;
  favorites = [];

  postTitle: string;

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.subscription = this.favoriteService.observableFavorites.subscribe(item => {
      this.favorites = item;
      if(containsObject(this.post, item)) {
        this.faDefault = this.faIcon;
      } else {
        this.faDefault = this.faIconOutline;
      }
    })
    this.favoriteService.getFavorites();
    this.postTitle = this.post.title ? this.post.title.slice(0, 27) + '...' : this.post.name;
  }

  onEvent(post: Trend | ChildData): void {
    if(this.action === "favorite"){
      this.onFavorite(post);
    } else if(this.action === "delete") {
      this.onDelete(post);
    }
  }

  onFavorite(post: Trend | ChildData): void {
    if(containsObject(post, this.favorites)){
      this.favoriteService.deleteFavorite(post);
    } else {
      this.favoriteService.addFavorite(post);
    }
  }

  onDelete(post: Trend | ChildData): void {
    this.favoriteService.deleteFavorite(post);
  }

}
