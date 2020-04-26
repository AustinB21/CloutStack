import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { faTwitter, faReddit, faGoogle } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() source: any
  @Input() clickedSource: any
  @Output() clicked: EventEmitter<any> = new EventEmitter(); 

  faIcons = {
    faTwitter,
    faReddit,
    faGoogle
  }
  mobile = false
  display = this.source
  constructor(public breakpointObserver: BreakpointObserver) { }

  didClick = false
  ngOnInit(): void {
    this.display = this.source
    this.breakpointObserver
    .observe(['(max-width: 1000px)'])
    .subscribe((state: BreakpointState) => {
      if(state.matches) {
        this.mobile = true
      } else {
        this.mobile = false
      }
    })
    this.breakpointObserver
    .observe(['(max-width: 1500px)'])
    .subscribe((state: BreakpointState) => {
      if(state.matches) {
        if (this.source === "New York Times") {
          this.display = "NYT"
        }
      } else {
        this.display = this.source
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes.clickedSource.currentValue == this.source){
      this.didClick = true
    } else {
      this.didClick = false
    }
  }

  onClick() {
    if(this.didClick){
      this.clicked.emit(null)
    } else {
      this.clicked.emit(this.source)
    }
  }

}
