import { Component, OnInit, Inject, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArmorData } from '../../types/armorData';
import { LocalStorageService } from '../../services/local-storage.service';
import { StatsBoxComponent } from './stats-box/stats-box.component';
import { SkillsBoxComponent } from './skills-box/skills-box.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @ViewChild(StatsBoxComponent, { static: false }) statsBox!: StatsBoxComponent;
  @ViewChild(SkillsBoxComponent, { static: false }) skillsBox!: SkillsBoxComponent;
  
  public isMobile = this.screenSizeService.isMobile$;
  
  // Indicates wich stats are going to be shown with ngSwitch.
  // 0 = defenses, 1 = skills, 2 = resources
  public showOnMobile: number = 0; 
  public equipedArmor: Array<ArmorData | null> = new Array<ArmorData | null>(5); // Array of armor parts


  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {}


  public selectPart(value: string) {
    this.router.navigate([`list/${value}`]);
  }

  public UpdateArmor() {
    let service = new LocalStorageService();
    
    this.equipedArmor[0] = service.getItem('helmet') ? service.getItem('helmet') : null;
    this.equipedArmor[1] = service.getItem('plate') ? service.getItem('plate') : null;
    this.equipedArmor[2] = service.getItem('guantlets') ? service.getItem('guantlets') : null;
    this.equipedArmor[3] = service.getItem('waist') ? service.getItem('waist') : null;
    this.equipedArmor[4] = service.getItem('leggings') ? service.getItem('leggings') : null;
    
    console.log("Equiped armor:"); // Debug
    console.log(this.equipedArmor
    ); // Debug
  }

  ngOnInit(): void {

    // Checks if the code is running on a browser to execute
    if (isPlatformBrowser(this.platformId)) {
      this.UpdateArmor();
    }
  }



  

  /* ngAfterViewInit(): void {
    // Check if childs are available to load
    if (this.statsBox) {
      this.statsBox.updateStats(this.equipedArmor);
    } else {
      console.error("statsBox is not available!");
    }

    if (this.skillsBox) {
      this.skillsBox.updateSkills(this.equipedArmor
      );
    }
    else {
      console.error("skillsBox is not available!")
    }
  } */
}
