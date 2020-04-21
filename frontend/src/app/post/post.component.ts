import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTwitter, faReddit, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { FavoriteService } from '../favorite.service';
import { containsObject } from '../generalFunctions';
import { Router } from '@angular/router'

declare const load: any;
// TODO: fix image loading issue when switching tabs
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
    faReddit,
    faGoogle
  }

  faDefault = this.faIconOutline;
  favorites = [];

  postTitle: string;
  postImage: any;
  postId: string;

  constructor(private favoriteService: FavoriteService, private router: Router) { }

  //Load user's favorites
  ngOnInit(): void {
    this.postId = this.post.title.replace(/[^\w]*/g, "")
    if(localStorage.getItem('username') != 'default') {
      this.favoriteService.getFavorites(localStorage.getItem('username')).subscribe(favs => {
        this.updateFavorites(favs)
      })
    } else {
      this.updateFavorites([])
    }
    this.postTitle = this.post.title
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(this.post.from_where !== "Reddit"){
      load(this.post.link, this.postId)
    } else {
      let matches = this.post.description.matchAll(/href="(.*?)"/gi)
      matches = Array.from(matches)
      load(matches[1][1], this.postId)
    }
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
    } else {
      localStorage.setItem('login_error', 'You have to login to save articles')
      this.router.navigate(['/login'])
    }
    if(this.isFavorited({"username": username, ...post})){
      this.favoriteService.deleteFavorite({"username": username, ...post}).subscribe(favs => {
        // console.log(username);
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
    // console.log(favs)
    let username = 'default'
    if (localStorage.getItem('username') != 'default'){
      username = localStorage.getItem('username')
    }
    this.favorites = favs
    if(this.isFavorited({"username": username, ...this.post})){
      this.faDefault = this.faIcon
    } else {
      this.faDefault = this.faIconOutline
    }
  }

}
