import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { containsObject } from './generalFunctions';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites= [];
  observableFavorites: BehaviorSubject<any[]>;
  
  constructor() {
    this.observableFavorites = new BehaviorSubject<any[]>(this.favorites)
  }

  eventChange() {
    this.observableFavorites.next(this.favorites);
  }

  getFavorites() {
    this.eventChange();
  }

  addFavorite(post: any) {
    this.favorites.push(post)
    this.eventChange();
  }

  deleteFavorite(post: any) {
    if(containsObject(post, this.favorites)) {
      this.favorites = this.favorites.filter(item => item !== post)
      this.eventChange();
    }
  }
}
