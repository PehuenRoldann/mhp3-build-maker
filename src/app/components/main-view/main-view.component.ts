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
  

  get equipedArmorArray () {

    let equipedArmorArr: ArmorData[] = [];

    if (this.equipedArmor) {
      this.equipedArmor.forEach(v => {
        equipedArmorArr.push(v);
      })
    }

    return equipedArmorArr;
  }


  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {}


  public selectPart(value: string) {
    this.selectedPart = value;
    this.openPieceModal();
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
