import { Component, OnInit } from '@angular/core';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  private subscription: Subscription;

  faIcons = {
    faTrash,
    faTimes
  }

  posts = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.subscription = this.favoriteService.observableFavorites.subscribe(item => {
      this.posts = item;
    })
    this.favoriteService.getFavorites();
  }

}
