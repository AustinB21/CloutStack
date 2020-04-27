import { Component, OnInit } from '@angular/core';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
  column = "col-4"

  constructor(private favoriteService: FavoriteService, public breakpointObserver: BreakpointObserver) { }

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

  filterPosts(source) {
    // console.log(this.favoriteService.filter(source))
    if(source){
      this.favoriteService.filter(source).then(favs => {
        this.posts = JSON.parse(favs)
      })
    } else {
      this.favoriteService.getFavorites(localStorage.getItem('username')).subscribe(favs => {
        this.posts = favs
      });
    }
    
  }

}
