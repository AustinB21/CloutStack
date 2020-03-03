import { Component, OnInit, Input } from '@angular/core';
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
  faIcons = {
    faTwitter,
    faReddit,
    faStar,
    faStarOutline
  }

  faFavorite = this.faIcons.faStarOutline;

  constructor() { }

  ngOnInit(): void {
  }

  onFavorite(): void {
    this.faFavorite = this.faFavorite === this.faIcons.faStar ? this.faIcons.faStarOutline : this.faIcons.faStar;
  }

}
