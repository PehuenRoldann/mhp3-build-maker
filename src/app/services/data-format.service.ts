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

  public getResourcesMap(resources: string): Map<string,number> {
    
    let resourcesMap = new Map<string, number>();
    
    let resourcesArr = resources.split(",");
    
    resourcesArr.forEach(elem => {

      let resourceAndValueArr = elem.split(":");
      resourceAndValueArr[0] = this.separateWord(resourceAndValueArr[0]);

      resourcesMap.set(resourceAndValueArr[0], Number.parseInt(resourceAndValueArr[1]));
    })

    return resourcesMap;
    
  }
 
  public separateWord (word: string): string {
    
    let wordSize = word.length;
    let regex = /^[A-Z]$/;

    let firstChar = 0;
    let wordsBuffer: string[] = [];

    for (let lastChar = 1; lastChar < wordSize; lastChar++) {

      if (regex.test(word[lastChar])) {

        wordsBuffer.push(word.slice(firstChar, lastChar));
        firstChar = lastChar;
      }
      
    }

    // Since the last word should end in lowercase, this adds it
    if (wordsBuffer[wordsBuffer.length - 1] !== word.slice(firstChar, wordSize - 1)) {
      
      wordsBuffer.push(word.slice(firstChar, wordSize));
    }

    let newStringWithSeparateWords = wordsBuffer[0];

    for (let i = 1; i < wordsBuffer.length; i++) {
      newStringWithSeparateWords += " " + wordsBuffer[i];
    }

    return newStringWithSeparateWords;
  }
}
