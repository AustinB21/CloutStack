import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faTwitter, faReddit, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { Trend } from '../tweet';
import { ChildData } from '../reddit';
import { JsonPipe } from '@angular/common';
import { containsObject } from '../generalFunctions';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Trend | ChildData;
  @Input() faIcon;
  @Input() faIconOutline;
  @Input() action: string;
  @Input() favorites;
  @Output() favorited = new EventEmitter<{isFavorite: boolean, post: Trend | ChildData}>();

  faIcons = {
    faTwitter,
    faReddit,
    faStar,
    faStarOutline
  }
  faDefault = null;

  isFavorite = false;

  constructor() { }

  ngOnInit(): void {
    if(!this.favorites){
      this.favorites = [];
      console.log(this.favorites)
    }
    if(containsObject(this.post, this.favorites)){
      this.faDefault = this.faIcon;
    } else {
      this.faDefault = this.faIconOutline;
    }
  }

  onEvent(post: Trend | ChildData): void {
    if(this.action === "favorite"){
      console.log('hi')
      this.onFavorite(post);
    } else if(this.action === "delete") {
      console.log(`Deleting post: ${post.name}`)
      this.onDelete(post);
    }
  }

  onFavorite(post: Trend | ChildData): void {
    this.isFavorite = !this.isFavorite;
    this.favorited.emit({ 
      isFavorite: this.isFavorite, 
      post
    });
    this.faDefault = this.faDefault === this.faIcon ? this.faIconOutline : this.faIcon;
  }

  onDelete(post: Trend | ChildData): void {
    this.favorited.emit({
      isFavorite: false,
      post
    })
  }

}
