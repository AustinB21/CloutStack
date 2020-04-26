import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(public breakpointObserver: BreakpointObserver) { }
  sources = ["Reddit", "Google"]
  column = "col-3"
  clicked = false
  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if(state.matches) {
          this.column = "col-6"
        } else {
          this.column = "col-3"
        }
      })
  }

  onClick() {
    this.clicked = !this.clicked
  }

}
