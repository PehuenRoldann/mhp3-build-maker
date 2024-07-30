import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ArmorData } from '../../../types/armorData';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.component.html',
  styleUrls: ['./stats-box.component.scss']
})
export class StatsBoxComponent implements OnChanges {

  public defense = 0;
  public fireRes = 0;
  public waterRes = 0;
  public thunderRes = 0;
  public iceRes = 0;
  public dragonRes = 0;
  
  @Input() armor: Array<ArmorData | null> = [];

  ngOnChanges(changes: SimpleChanges): void {
    
    this.updateStats(this.armor);
    /* this.resetStats();
    if (this.armor.length > 0) {
      this.updateStats(this.armor);
    } */
  }


  updateStats(data: Array<ArmorData | null>): void {

    this.resetStats();
    
    data.forEach(element => {
      if (element) {
        this.defense += element.defense;
        this.fireRes += element.fire_res;
        this.waterRes += element.water_res;
        this.thunderRes += element.thunder_res;
        this.iceRes += element.ice_res;
        this.dragonRes += element.dragon_res;
      }
    });
  }

  private resetStats(): void {
    this.defense = 0;
    this.fireRes = 0;
    this.waterRes = 0;
    this.thunderRes = 0;
    this.iceRes = 0;
    this.dragonRes = 0;
  }
}