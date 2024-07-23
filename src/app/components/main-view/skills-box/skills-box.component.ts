import { Component, Input, OnInit } from '@angular/core';
import { ArmorData } from '../../../types/armorData';
import { LocalStorageService } from '../../../services/local-storage.service';
import { DataFormatService } from '../../../services/data-format.service';

@Component({
  selector: 'app-skills-box',
  templateUrl: './skills-box.component.html',
  styleUrl: './skills-box.component.scss'
})
export class SkillsBoxComponent implements OnInit{

  // Hash map with the skills an its values
  skills: Map<string,number> = new Map<string,number>();

  get skillsArray() {
    // console.log(Array.from(this.skills.entries())); DEBUG
    return Array.from(this.skills.entries());
  }

  isPositive = (num: number): boolean => {
    // console.log(num > 0); #DEBUG
    return num > 0;
  }

  ngOnInit(): void {

  }

  public updateSkills (equipedArmor: Array<ArmorData | null>) {

    let service = new DataFormatService();
    let currentSkillsMap = new Map<string,number>();

    // First gets the map for the skills of a equiped armor part,
    // then adds that to the general skills map that is going to be shown

    equipedArmor.forEach(elem => {

      if (elem) {
        
        service.getSkillsMap(elem.skills).forEach((value, key) => {

          if (this.skills.has(key)) {
            this.skills.set(key, this.skills.get(key)! + value);
          }
          else {
            this.skills.set(key, value);
          }

        })

      }
    })
  }

}
