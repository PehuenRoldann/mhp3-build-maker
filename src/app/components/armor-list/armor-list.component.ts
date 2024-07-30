import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmorDataAccessService } from '../../services/armor-data-access.service';
import { ArmorData } from '../../types/armorData';
import { LocalStorageService } from '../../services/local-storage.service';
import { ArmorCompatibilityService } from '../../services/armor-compatibility.service';
import { bootstrapApplication } from '@angular/platform-browser';


declare var bootstrap: any; 

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrl: './armor-list.component.scss'
})
export class ArmorListComponent implements OnInit {

  partsToShow = "helmets";

  // @Output() armorEquipedEventEmmiter: EventEmitter<ArmorData> = new EventEmitter(); NO NEED WITH ROUTER

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

  constructor (private route: ActivatedRoute, private router: Router) {}
  
  async ngOnInit(): Promise<void> {

    this.route.paramMap.subscribe(params => {
      this.partsToShow = params.get('parts')!;
    })
    this.armorData = await this.service.getArmorData(this.partsToShow);


  }

  public changeToHome () {
    this.router.navigate(['/home']);
  }


  public openIncompatibilityModal() {
    const modalElement = document.getElementById('exampleModal');

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Usa el servicio de Bootstrap para abrir el modal
      modal.show();
    }
  }

  public checkCompatibility (part: string, data: ArmorData) {

    let lsService = new LocalStorageService();
    let acService = new ArmorCompatibilityService();

    let currentEquipment = lsService.currentEquipment;

    /* console.log("CONTROL COMPATIBILIDAD"); // Debug
    console.log("part: " + part);
    console.log("Current Equipment:")
    console.log(currentEquipment); */

    let compatibility = acService.checkCompatibility(data, currentEquipment, part)

    console.log(`Compatibility: ${compatibility}`); // Debug

    if (!compatibility) {
      this.openIncompatibilityModal();
    }

    return compatibility
  }

  // Event that happens when the user clicks on the Equip button
  public armorEquipedEvent(data: ArmorData){
    
    let service = new LocalStorageService();
    let part = "";

    switch (this.partsToShow){
      case 'helmets': part = 'helmet'; break;
      case 'plates': part = 'plate'; break;
      case 'waists': part = 'waist'; break;
      case 'guantlets': part = 'guantlets'; break;
      case 'leggings': part = 'leggings'; break;
    }

    if(this.checkCompatibility(part, data)){
      
      service.setItem(part, data);
      this.changeToHome();
    }
  }

  // Property to only show the filtered data from the armors data
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
