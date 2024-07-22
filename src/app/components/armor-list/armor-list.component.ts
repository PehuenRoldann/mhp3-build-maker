import { Component, OnInit, Input } from '@angular/core';
import { ArmorDataAccessService } from '../../services/armor-data-access.service';
import { ArmorData } from '../../types/armorData';

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrl: './armor-list.component.scss'
})
export class ArmorListComponent implements OnInit {

  @Input() partsToShow = "helmets";

  private service = new ArmorDataAccessService();
  private armorData: ArmorData[] = [];

  public searchInput: string = "";

  public minDefenseFilter?: number;
  public minRareFilter?: number;
  public minSlotsFilter?: number;
  public minFireResFilter?: number;
  public minWaterResFilter?: number;
  public minThunderResFilter?: number;
  public minIceResFilter?: number;
  public minDragonResFilter?: number;

  
  async ngOnInit(): Promise<void> {
     this.armorData = await this.service.getArmorData(this.partsToShow);
  }

  get filteredArmorData ( ): ArmorData[] {

    let filteredData: ArmorData[] = this.armorData;

    if (this.searchInput) {
      filteredData = filteredData.filter(u => {
        return u.name.toLowerCase().includes(this.searchInput.toLocaleLowerCase()) ||
        u.skills.toLowerCase().includes(this.searchInput.toLowerCase());
      });
    }


    if (this.minRareFilter) {
      filteredData = filteredData.filter(u => u.rare >= this.minRareFilter!);
    }

    if (this.minDefenseFilter) {
      filteredData = filteredData.filter(u => u.defense >= this.minDefenseFilter!);
    }

    if (this.minSlotsFilter) {
      filteredData = filteredData.filter(u => u.slots >= this.minSlotsFilter!);
    }

    if (this.minFireResFilter != undefined) {
      filteredData = filteredData.filter(u => u.fire_res >= this.minFireResFilter!);
    }

    if (this.minWaterResFilter != undefined) {
      filteredData = filteredData.filter(u => u.water_res >= this.minWaterResFilter!);
    }

    if (this.minThunderResFilter != undefined) {
      filteredData = filteredData.filter(u => u.thunder_res >= this.minThunderResFilter!);
    }

    if (this.minIceResFilter != undefined) {
      filteredData = filteredData.filter(u => u.ice_res >= this.minIceResFilter!);
    }

    if (this.minDragonResFilter != undefined) {
      filteredData = filteredData.filter(u => u.dragon_res >= this.minDragonResFilter!);
    }

    return filteredData;
  }

}
