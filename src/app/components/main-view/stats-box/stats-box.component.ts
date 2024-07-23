import { Component, OnChanges, SimpleChanges } from '@angular/core';
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
  
  ngOnChanges(changes: SimpleChanges): void {
    // Aquí puedes manejar los cambios de las propiedades de entrada
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