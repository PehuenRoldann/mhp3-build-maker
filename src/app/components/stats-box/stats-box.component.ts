import { Component, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.component.html',
  styleUrl: './stats-box.component.scss'
})
export class StatsBoxComponent implements OnChanges {

  
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

}
