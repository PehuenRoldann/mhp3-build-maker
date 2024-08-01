import { Component, OnInit, Inject, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArmorData } from '../../types/armorData';
import { LocalStorageService } from '../../services/local-storage.service';
import { StatsBoxComponent } from './stats-box/stats-box.component';
import { SkillsBoxComponent } from './skills-box/skills-box.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';

declare var bootstrap: any;

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @ViewChild(StatsBoxComponent, { static: false }) statsBox!: StatsBoxComponent;
  @ViewChild(SkillsBoxComponent, { static: false }) skillsBox!: SkillsBoxComponent;
  
  public isMobile = this.screenSizeService.isMobile$;
  
  public selectedPart: string = "";
  public showOnMobile: number = 0;  // Indicates wich stats are going to be shown with ngSwitch. 0 = defenses, 1 = skills, 2 = resources
  public equipedArmor: Map<string, ArmorData> = new Map<string, ArmorData>;
  
  public helmetDone: boolean = false;
  public plateDone: boolean = false;
  public guantletsDone: boolean = false;
  public waistDone: boolean = false;
  public legginsDone: boolean = false;

  get equipedArmorArray () {

    let equipedArmorArr: ArmorData[] = [];

    if (this.equipedArmor) {
      this.equipedArmor.forEach(v => {
        equipedArmorArr.push(v);
      })
    }

    return equipedArmorArr;
  }

  get equipedArmorArrayResources () {

    let equipedArmorArr: ArmorData[] = [];

    if (!this.equipedArmor) {return []}

    let addToArr = false;

    this.equipedArmor.forEach((v, k) => {

      console.log("K es: " + k);

      addToArr = false;

      console.log("Should add " + k + "?");// Debug
      switch (k) {// Debug
        case 'helmet':
          console.log(!this.helmetDone);
          break;
        case 'plate':
          console.log(!this.plateDone);
          break;
        case 'waist':
          console.log(!this.waistDone);
          break;
        case 'guantlets':
          console.log(!this.guantletsDone);
          break;
        case 'leggings':
          console.log(!this.legginsDone);
          break;
      }

      addToArr = (k === 'helmet' && !this.helmetDone) || addToArr;
      addToArr = (k === 'plate' && !this.plateDone) || addToArr;
      addToArr = (k === 'waist' && !this.waistDone) || addToArr;
      addToArr = (k === 'guantlets' && !this.guantletsDone) || addToArr;
      addToArr = (k === 'leggings' && !this.legginsDone) || addToArr;

      if (addToArr) {
        console.log("Resources to show"); //Debug
        console.log(v); //Debug
        equipedArmorArr.push(v);
      }
    })

    return equipedArmorArr;
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {}


  public selectPart(value: string) {


    this.selectedPart = value;

    if (this.equipedArmor.get(this.selectedPart)){
      this.openPieceModal();
    }
    else {
      this.ChangeSelectedPart();
    }
    
  }

  public UpdateArmor() {
    let service = new LocalStorageService();

    this.equipedArmor = service.currentEquipment;
    
    console.log("Equiped armor:"); // Debug
    console.log(this.equipedArmor); // Debug
  }

  ngOnInit(): void {

    // Checks if the code is running on a browser to execute
    if (isPlatformBrowser(this.platformId)) {
      this.UpdateArmor();
    }
  }

  public ChangeSelectedPart() {

    this.closePieceModal();

    let param = "";

    switch (this.selectedPart) {
      case 'plate':
        param = 'plates';
        break;
      case 'waist':
        param = 'waists';
        break;
      case 'helmet':
        param = 'helmets';
        break;
      default:
        param = this.selectedPart;
        break;
    }

    this.router.navigate([`list/${param}`]);
  }

  public RemoveSelectedPart() {

    this.closePieceModal();

    let service = new LocalStorageService();
    service.removeItem(this.selectedPart);
    this.UpdateArmor();
  }

  public closePieceModal() {
    const modalElem = document.getElementById('pieceModal');

    if (modalElem) {
      let modal = new bootstrap.Modal(modalElem);
      modal.hide();

      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(backdrop => backdrop.parentNode?.removeChild(backdrop));
    }
    
  }

  private openPieceModal () {

    const modalElem = document.getElementById('pieceModal');

    if (modalElem) {
      let modal = new bootstrap.Modal(modalElem);
      modal.show();
    }
  }
}
