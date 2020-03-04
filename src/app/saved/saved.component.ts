import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { containsObject } from '../generalFunctions';
import { Trend } from '../tweet';
import { ChildData } from '../reddit';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  @Input() posts;
  @Output() favoriteList = new EventEmitter<Array<Trend | ChildData>>();

  faIcons = {
    faTrash,
    faTimes
  }

  constructor() { }

  ngOnInit(): void {
  }

  onFavorited(data) {
    if(containsObject(data.post, this.posts)){
      if(!data.isFavorite) {
        this.posts = this.posts.filter(article => article !== data.post)
      }
    }
    this.favoriteList.emit(this.posts);
  }

}
