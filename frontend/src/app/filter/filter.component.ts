import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() source: any
  @Input() clickedSource: any
  @Output() clicked: EventEmitter<any> = new EventEmitter(); 
  constructor() { }

  didClick = false
  ngOnInit(): void {
    console.log(
      this.source + this.clickedSource
    )
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
