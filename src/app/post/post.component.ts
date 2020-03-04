import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faTwitter, faReddit, faRedditAlien } from '@fortawesome/free-brands-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';
import { Trend } from '../tweet';
import { ChildData } from '../reddit';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Trend | ChildData;
  @Output() favorited = new EventEmitter<{isFavorite: boolean, post: Trend | ChildData}>();

  faIcons = {
    faTwitter,
    faReddit,
    faStar,
    faStarOutline
  }

  isFavorite = false;
  faFavorite = this.faIcons.faStarOutline;

  constructor() { }

  ngOnInit(): void {
  }

  onFavorite(post: Trend | ChildData): void {
    this.isFavorite = !this.isFavorite;
    this.favorited.emit({ 
      isFavorite: this.isFavorite, 
      post
    });
    this.faFavorite = this.faFavorite === this.faIcons.faStar ? this.faIcons.faStarOutline : this.faIcons.faStar;
  }

}
