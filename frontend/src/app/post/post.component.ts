import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTwitter, faReddit } from '@fortawesome/free-brands-svg-icons';

import { FavoriteService } from '../favorite.service';
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
  @Output() getFavoritesChange = new EventEmitter<any>()
  
  faIcons = {
    faTwitter,
    faReddit
  }

  faDefault = this.faIconOutline;
  favorites = [];

  postTitle: string;

  constructor(private favoriteService: FavoriteService) { }

  //Load user's favorites
  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe(favs => {
      this.updateFavorites(favs)
    })
    this.postTitle = this.post.title
  }

  //controller method that delegates which action to perform on post
  onEvent(post): void {
    if(this.action === "favorite"){
      this.onFavorite(post);
    } else if(this.action === "delete") {
      this.onDelete(post);
    }
  }

  onFavorite(post): void {
    let username = 'default';
    if (localStorage.getItem('username') != 'default'){
      username = localStorage.getItem('username');
    }
    console.log(username);
    if(this.isFavorited({"username": username, ...post})){
      this.favoriteService.deleteFavorite({"username": username, ...post}).subscribe(favs => {
        this.updateFavorites(favs)
      })
    } else {
      this.favoriteService.addFavorite({"username": username, ...post}).subscribe(favs => {
        this.updateFavorites(favs)
      })
    }
  }

  onDelete(post): void {
    this.favoriteService.deleteFavorite(post).subscribe(favs => {
      this.updateFavorites(favs)
      this.getFavoritesChange.emit(this.favorites)
    })
  }

  isFavorited(post): boolean {
    return containsObject(post, this.favorites)
  }

  updateFavorites(favs): void {
    this.favorites = favs
    if(this.isFavorited({"username": "default", ...this.post})){
      this.faDefault = this.faIcon
    } else {
      this.faDefault = this.faIconOutline
    }
  }

}
