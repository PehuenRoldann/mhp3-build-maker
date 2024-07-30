import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArmorData } from '../../../types/armorData';
import { DataFormatService } from '../../../services/data-format.service';

@Component({
  selector: 'app-skills-box',
  templateUrl: './skills-box.component.html',
  styleUrl: './skills-box.component.scss'
})


export class SkillsBoxComponent implements OnChanges{

  
  skills: Map<string,number> = new Map<string,number>();// Hash map with the skills an its values to show

  @Input() armor: Array<ArmorData | null> = [];

  ngOnChanges(changes: SimpleChanges): void {

    this.updateSkills(this.armor);
  }

  get skillsArray() {
    // console.log(Array.from(this.skills.entries())); DEBUG
    return Array.from(this.skills.entries());
  }

  isPositive = (num: number): boolean => {// let currentSkillsMap = new Map<string,number>(); NO se usa?
    // console.log(num > 0); #DEBUG
    return num > 0;
  }

  public updateSkills (equipedArmor: Array<ArmorData | null>) {

    let service = new DataFormatService();

    this.skills = new Map<string,number>(); // Reset the skills

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

    this.sortSkills();
  }

  private sortSkills () {
    
    let valuesArrToSort: number [] = [];

    this.skills.forEach((value, key) => {
      valuesArrToSort.push(value);
    })

    for (let i = 0; i < valuesArrToSort.length; ++i) {
      for (let j = 0; j < valuesArrToSort.length; ++j) {
        if (valuesArrToSort[i] > valuesArrToSort[j]) {
          let aux = valuesArrToSort[i];
          valuesArrToSort[i] = valuesArrToSort[j];
          valuesArrToSort[j] = aux;
        }
      }
    }

    let sortedSkills = new Map<string, number>();

    valuesArrToSort.forEach(val => {
      this.skills.forEach((v, k) => {

        if (v === val) {
          sortedSkills.set(k, v);
        }

      })
    })
    this.skills = sortedSkills;


  }

}
