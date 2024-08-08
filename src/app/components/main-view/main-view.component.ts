import { Component, OnInit, Inject, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArmorData, piecesTypes, pieceType } from '../../types/armorData';
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {}


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

  public partToDisplay = pieceType;



  get equipedArmorArray () {

    let equipedArmorArr: ArmorData[] = [];

    if (this.equipedArmor) {
      this.equipedArmor.forEach(v => {
        equipedArmorArr.push(v);
      })
    }

    return equipedArmorArr;
  }


  /**
   * Returns the armor pieces that are not done to know what resources are needed.
   */
  get equipedArmorArrayResources () {

    let equipedArmorArr: ArmorData[] = [];

    if (!this.equipedArmor) {return []}

    let addToArr = false;

    this.equipedArmor.forEach((v, k) => {

      addToArr = false;

      addToArr = (k === pieceType.helmet && !this.helmetDone) || addToArr;
      addToArr = (k === pieceType.plate && !this.plateDone) || addToArr;
      addToArr = (k === pieceType.waist && !this.waistDone) || addToArr;
      addToArr = (k === pieceType.guantlets && !this.guantletsDone) || addToArr;
      addToArr = (k === pieceType.leggings && !this.legginsDone) || addToArr;

      if (addToArr) {
        equipedArmorArr.push(v);
      }
    })

    return equipedArmorArr;
  }


  

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
      case pieceType.plate:
        param = piecesTypes.plates;
        break;
      case pieceType.waist:
        param = piecesTypes.waists;
        break;
      case pieceType.helmet:
        param = piecesTypes.helmets;
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
