import { Component, OnInit, Inject, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ArmorData } from '../../types/armorData';
import { LocalStorageService } from '../../services/local-storage.service';
import { StatsBoxComponent } from './stats-box/stats-box.component';
import { SkillsBoxComponent } from './skills-box/skills-box.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit {

  @ViewChild(StatsBoxComponent, { static: false }) statsBox!: StatsBoxComponent;
  @ViewChild(SkillsBoxComponent, { static: false }) skillsBox!: SkillsBoxComponent;

  @Output() showPartsListEvent = new EventEmitter<string>();
  
  public EquipedArmor: Array<ArmorData | null> = new Array<ArmorData | null>(5);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}


  public selectPart(value: string) {
    this.showPartsListEvent.emit(value);
  }

  public UpdateArmor() {
    let service = new LocalStorageService();
    
    this.EquipedArmor[0] = service.getItem('helmet') ? service.getItem('helmet') : null;
    this.EquipedArmor[1] = service.getItem('plate') ? service.getItem('plate') : null;
    this.EquipedArmor[2] = service.getItem('guantlets') ? service.getItem('guantlets') : null;
    this.EquipedArmor[3] = service.getItem('waist') ? service.getItem('waist') : null;
    this.EquipedArmor[4] = service.getItem('leggings') ? service.getItem('leggings') : null;
    
    console.log("Equiped armor:");
    console.log(this.EquipedArmor);
  }

  ngOnInit(): void {

    // Checks if the code is running on a browser to execute
    if (isPlatformBrowser(this.platformId)) {
      this.UpdateArmor();
    }
  }

  

  ngAfterViewInit(): void {
    // Asegúrate de que statsBox está disponible
    if (this.statsBox) {
      this.statsBox.updateStats(this.EquipedArmor);
    } else {
      console.error("statsBox is not available!");
    }

    if (this.skillsBox) {
      this.skillsBox.updateSkills(this.EquipedArmor);
    }
    else {
      console.error("skillsBox is not available!")
    }
  }
}
