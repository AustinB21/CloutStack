import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css']
})
export class RadiobuttonComponent implements OnInit {
  sources = ["Reddit", "Google"]
  column = "col-3"
  clickedSource: any
  constructor(public breakpointObserver: BreakpointObserver) { }

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

  onClicked(value) {
    this.clickedSource = value
  }

}
