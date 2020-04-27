import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons';

import { FrontpageService } from '../frontpage.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  
  faIcons = {
    faStar,
    faStarOutline,
    faSearch
  }
  column = "col-4"

  posts: any[];
  original: any[];
  form : FormGroup;
  constructor(private frontpageService: FrontpageService, public breakpointObserver: BreakpointObserver, private fb: FormBuilder) { }

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
      this.getPosts();

      this.form = this.fb.group({
        search: ['']
      });
  }

  searchRegEx: RegExp
  onSearch() {
    let searchString = this.form.get("search").value;
    console.log(searchString);
    //searchString = (searchString == '') ? '' : searchString;

    if(this.source){
      this.posts = this.original.filter(post => post.from_where == this.source)
    } else {
      this.posts = this.original
    }

    this.searchRegEx = new RegExp(searchString.toLowerCase());
    this.posts = this.posts.filter(post => this.searchRegEx.test(post.title.toLowerCase()));


    
  }

  getPosts(): void {
    this.frontpageService.getPosts()
        .subscribe(posts => {
          this.posts = posts
          this.original = posts
        })
  }

  source : any
  filterPosts(source) {
    if(source){
      this.posts = this.original.filter(post => post.from_where == source)
    } else {
      this.posts = this.original
    }
    if(this.searchRegEx){
      this.posts = this.posts.filter(post => this.searchRegEx.test(post.title.toLowerCase()))
    }
  }
}
