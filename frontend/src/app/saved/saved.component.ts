import { Component, OnInit } from '@angular/core';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  faIcons = {
    faTrash,
    faTimes
  }

  posts = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    if(localStorage.getItem('username') != 'default'){
      this.favoriteService.getFavorites(localStorage.getItem('username')).subscribe(favs => {
        this.posts = favs
      });
    } else {
      this.posts = []
    }
  }

  // Method called by the child component, post, when post is deleted
  updateFavorites(favs) {
    this.posts = favs
  }

}
