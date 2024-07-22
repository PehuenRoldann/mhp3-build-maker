import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

  @Output() showPartsListEvent = new EventEmitter<string>();


  public selectPart(value: string) {

    console.log("showPartsEvent emited");
    this.showPartsListEvent.emit(value);
  }

}
