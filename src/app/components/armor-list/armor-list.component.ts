import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArmorDataAccessService } from '../../services/armor-data-access.service';
import { ArmorData, piecesTypes, pieceType } from '../../types/armorData';
import { LocalStorageService } from '../../services/local-storage.service';
import { ArmorCompatibilityService } from '../../services/armor-compatibility.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DataFormatService } from '../../services/data-format.service';
import { CsvDataAccessService } from '../../services/csv-data-access.service';


declare var bootstrap: any; 

@Component({
  selector: 'app-armor-list',
  templateUrl: './armor-list.component.html',
  styleUrl: './armor-list.component.scss'
})
export class ArmorListComponent implements OnInit {

  partsToShow = piecesTypes.helmets.valueOf(); // Type of parts to show (helmets for default)


  public armorData: ArmorData[] = [];

  public armorToEquip!: ArmorData; // Armor to equip when the quip button is pressed
  public armorToReplace: ArmorData = new ArmorData(); // Armor equiped now (could be null so we add a default for that case)
  public part?: string;

  public searchInput: string = "";

  // FILTERS USED IN THE NAV
  public minDefenseFilter?: number;
  public minRareFilter?: number;
  public minSlotsFilter?: number;
  public minFireResFilter?: number;
  public minWaterResFilter?: number;
  public minThunderResFilter?: number;
  public minIceResFilter?: number;
  public minDragonResFilter?: number;

  constructor (
    @Inject(PLATFORM_ID) private platformId: any,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private armorDataAccessService: ArmorDataAccessService,
    private csvDataAccess: CsvDataAccessService,
    private armorCompatibilityService: ArmorCompatibilityService,
    private armorDataFormatService: DataFormatService
  ) {}
  
  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.route.paramMap.subscribe(params => {
        this.partsToShow = params.get('parts')!;
      })
      
      this.fetchData();

      switch (this.partsToShow){
        case piecesTypes.helmets: this.part = pieceType.helmet; break;
        case piecesTypes.plates: this.part = piecesTypes.plates; break;
        case piecesTypes.waists: this.part = pieceType.waist; break;
        default: this.part = this.partsToShow; break;
      }


      this.armorToReplace  = this.localStorageService.getItem(this.part!) || this.armorToReplace;
      
    }
    
  }

  private async fetchData(): Promise<void> {
      this.armorData = await this.csvDataAccess.getArmorData(this.partsToShow);
  }

  public changeToHome () {
    this.router.navigate(['/home']);
  }

  get propertiesToCompare (): Map <string, [number, number, number]> {

    if (!this.armorToEquip) {
      return new Map <string, [number, number, number]>();
    }

    return this.armorCompatibilityService.compareArmorsStatsMap(this.armorToReplace, this.armorToEquip);

  }

  get resourcesForNewEquip () {
    return this.armorDataFormatService.getResourcesMap(this.armorToEquip.materials) || new Map<string, number>();
  }


  /**
   * Returns a map where key = skill name, and the value is a 3-tupla where [0] value for old piece, [1] value for new piece, 
   * [2] change implcations (0 = upgrade, 1 = same, 2 = downgrade)
   */
  get skillsToCompare () : Map <string, [number, number, number]> {

    if (!this.armorToEquip) {
      return new Map<string, [number, number, number]>();
    }

    let oldSkills = this.armorDataFormatService.getSkillsMap(this.armorToReplace.skills);
    let newSkills = this.armorDataFormatService.getSkillsMap(this.armorToEquip.skills);

    return this.armorCompatibilityService.compareSkills(oldSkills, newSkills);
  }

  /**
   * Opens a the modal with the given ID.
   * @param modalID Modal ID = incompatibilityModal, comparationModal.
   */
  public openModal(modalID: string) {
    const modalElement = document.getElementById(modalID);

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Usa el servicio de Bootstrap para abrir el modal
      modal.show();
    }
  }

  /**
   * Checks if the armor given as parameter is compatible with the current armor.
   * @param part helmet, plate, guantlets, waist or leggings.
   * @param data ArmorData instance that is going the be check for compatibility.
   * @returns True if compatible. False if not.
   */
  public checkCompatibility (part: string, data: ArmorData) {


    let currentEquipment = this.localStorageService.currentEquipment;

    let compatibility = this.armorCompatibilityService.checkCompatibility(data, currentEquipment, part)

    console.log(`Compatibility: ${compatibility}`); // Debug

    if (!compatibility) {
      this.openModal('incompatibilityModal');
    }

    return compatibility
  }

  /**
   * Triggers when the user clicks the equip button on armir-list-item component.
   * @param data The ArmorData instance to equip.
   */
  public equipButtonEvent(data: ArmorData){

    if(this.checkCompatibility(this.part!, data)){

      this.armorToEquip = data;
      this.openModal('comparationModal');
    }
  }

  /**
   * Equips de piece of armor and changes back to main view.
   */
  public equipArmor() {

    this.localStorageService.setItem(this.part!, this.armorToEquip!);
    this.changeToHome();
  }


  /**
   * Filtered ArmorData Array.
   */
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
