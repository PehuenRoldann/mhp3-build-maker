import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./main-view.component.scss', './piece-modal.scss',
     './load-sets-modal.scss', './save-sets-modal.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private screenSizeService: ScreenSizeService,
    private localStorageService: LocalStorageService
  ) {}


  ngAfterViewInit(): void {

    // this.cd.detectChanges();
  }

  ngOnInit(): void {

    // Checks if the code is running on a browser to execute
    if (isPlatformBrowser(this.platformId)) {

      this.UpdateArmor();

    }

    // this.cd.detectChanges();
  }

  @ViewChild(StatsBoxComponent, { static: false }) statsBox!: StatsBoxComponent;
  @ViewChild(SkillsBoxComponent, { static: false }) skillsBox!: SkillsBoxComponent;

  public isMobile = this.screenSizeService.isMobile$;

  public selectedPart: string = "";
  public setNameToSave: string = '';
  public showOnMobile: number = 0;  // Indicates wich stats are going to be shown with ngSwitch. 0 = defenses, 1 = skills, 2 = resources
  public equipedArmor: Map<string, ArmorData> = new Map<string, ArmorData>;
  public savedArmorSets: [string, Map<string,ArmorData>][] = [];
  private setToRemoveName: string = '';


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
      this.openModal('pieceModal');
    }
    else {
      this.ChangeSelectedPart();
    }

  }

  public UpdateArmor() {
    let service = new LocalStorageService();

    this.equipedArmor = service.currentEquipment;
    // console.log("Equiped Armor: "); DEBUG
    // console.log(this.equipedArmor); DEBUG
  }



  public ChangeSelectedPart() {

    //this.closePieceModal(); not necesary anymore

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

  /**
   * Removes a equiped part of the current set.
   */
  public RemoveSelectedPart() {

    // this.closePieceModal(); not necessary anymore

    let service = new LocalStorageService();
    service.removeItem(this.selectedPart);
    this.UpdateArmor();
  }

   /**
   * Opens a the modal with the given ID.
   * @param modalID Modal ID = pieceModal, saveSetModal, loadSetModal, removeConfModal, setNameNotAvailableModal.
   */
   public openModal(modalID: string) {
    const modalElement = document.getElementById(modalID);

    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement); // Usa el servicio de Bootstrap para abrir el modal
      modal.show();
    }
  }

  public onSaveButtonClick() {

    this.openModal('saveSetModal');
  }

  public onSaveConfirmBtnClick() {

    let nameAvailable = this.localStorageService.isSetNameAvailable(this.setNameToSave);

    // console.log("Name used: " + nameAvailable); DEBUG

    if (!nameAvailable) {
      this.openModal('setNameNotAvailableModal');
    }
    else {
      this.localStorageService.saveSet(this.setNameToSave, this.equipedArmor);

    }
  }

  public onLoadBtnClick() {

    this.savedArmorSets = this.localStorageService.getSavedSets();

    // console.log(this.savedArmorSets); DEBUG
    this.openModal('loadSetModal');

  }

  /**
   * Sets the current set as the saved set.
   * @param set Saved set to set as current.
   */
  public onClickSetBtn(set: Map<string, ArmorData>) {

    this.equipedArmor = set;

    for (let key of set.keys()) {
      this.localStorageService.setItem(key, set.get(key)!);
    }

  }

  public onClickRemoveBtn(setName: string) {

    this.openModal('removeConfModal');
    this.setToRemoveName = setName;
  }

  public onOverwriteSetClickBtn() {
    this.localStorageService.saveSet(this.setNameToSave, this.equipedArmor);
  }

  public removeSet() {

    this.localStorageService.removeSet(this.setToRemoveName);
    this.savedArmorSets = this.localStorageService.getSavedSets();
  }



}
