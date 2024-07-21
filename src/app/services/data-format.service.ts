import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataFormatService {

  constructor() { }

  public getSkillsMap(skillsStr: string): Map<string, number> {

    let skillsMap: Map<string,number> = new Map<string,number>();

    // Remove the [ ] from the string
    skillsStr = skillsStr.replace(/\[|\]/g, '');

    let skillsArray: string[] = skillsStr.split(",");

    skillsArray.forEach( skillAndValueStr => {

      let skillAndValueArry = skillAndValueStr.split(":");
      skillsMap.set(skillAndValueArry[0], Number.parseInt(skillAndValueArry[1]));
    } )

    return skillsMap;

  }


  public getSkillsArray(skillsStr: string): [string, number][] {

    let arrayTuplas: [string, number][] = [];

    // Remove the [ ] from the string
    skillsStr = skillsStr.replace(/\[|\]/g, '');

    let skillsArray: string[] = skillsStr.split(",");

    skillsArray.forEach( skillAndValueStr => {

      let skillAndValueArry = skillAndValueStr.split(":");
      arrayTuplas.push([skillAndValueArry[0], Number.parseInt(skillAndValueArry[1])]);
    } )

    return arrayTuplas;

  }
}
