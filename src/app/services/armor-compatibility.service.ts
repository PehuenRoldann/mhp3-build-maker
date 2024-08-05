import { Injectable } from '@angular/core';
import { ArmorData } from '../types/armorData';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArmorCompatibilityService {

  constructor() { }

  /**
   * This methods checks if a piece of armor is compatible with the rest you have equiped.
   * @param piece The piece you want to equip.
   * @param equipedArmor The pieces you have equiped.
   * @param replace The piece that is going to be replaced from the current equipment.
   */
  public checkCompatibility(piece: ArmorData,
    equipedArmor: Map<string, ArmorData>,
    replace: string): boolean {

    let compatibility = true;
    
    equipedArmor.forEach((v, k) => {


      if (replace !== k && compatibility) {
        compatibility = piece.class == v.class || v.class > 1 || piece.class > 1;
      }

    });

    return compatibility;
    
  }

  /**
   * This metod recieves two instances of ArmorData an returns a map with the property and the respective values.
   * @param armorToReplace Current equiped instance.
   * @param armorToEquip New instance.
   * @returns A map where key: string value: [number, number, boolean].
   * The first number is for the current instance value.
   * The second number is for the new instance value.
   * The third number represents upgrade = 0, not upgrade = 1 or downgrade = 2.
   */
  public compareArmorsStatsMap (armorToReplace: ArmorData, armorToEquip: ArmorData): Map<string,[number,number,number]> {

    let mapToCompare = new Map <string, [number, number, number]>();
     
    Object.entries(armorToReplace).forEach(([key1, value1]) => {
      Object.entries(armorToEquip).forEach(([key2, value2]) => {
        
        if (key1 === key2 && key1 !== 'skills' && key1 !== 'materials' && key1 !== 'name' && key1 !== 'class') 
          {

            switch (key1) {
              case 'name': 
                key1 = 'Name'; 
                break;
              case 'rare': 
                key1 = 'Rare'; 
                break;
              case 'defense': 
                key1 = 'Defense'; 
                break;
              case 'slots': 
                key1 = 'Slots'; 
                break;
              case 'fire_res': 
                key1 = 'Fire Res'; 
                break;
              case 'water_res': 
                key1 = 'Water Res'; 
                break;
              case 'thunder_res': 
                key1 = 'Thunder Res'; 
                break;
              case 'ice_res': 
                key1 = 'Ice Res'; 
                break;
              case 'dragon_res': 
                key1 = 'Dragon Res'; 
                break;
              case 'class': 
                key1 = 'Class'; 
                break;
            }

            mapToCompare.set(key1, [value1, value2,
               value1 < value2 ? 0 : (value1 > value2 ? 2 : 1)]);
          }
      })
    })

    return mapToCompare;
  }

  /**
   * Compare two skills maps and tells the upgrade or downgrade for a skill.
   * @param oldSkills old skill map
   * @param newSkills new skill map
   * @returns A map where the keys are the skills names, a 3-tupla where:
   * [0]: old value for the skill.
   * [1]: new value for the sill.
   * [2]: Change: 0 = upgrade, 1 = none, 2 = downgrade.
   */
  public compareSkills (oldSkills: Map<string, number>, 
    newSkills: Map<string,number>): Map<string,[number,number,number]> {

    let comparationMap = new Map<string,[number,number,number]>();

    newSkills.forEach((v, k) => {

      let oldValue: number = oldSkills.get(k) || 0;

      comparationMap.set(k, [
        oldValue,
        v,
        oldValue < v ? 0 : (oldValue > v ? 2 : 1)
      ]);

    });

    if (oldSkills.has("")) { // If the old piece has not skills
      return comparationMap;
    }

    oldSkills.forEach((v, k) => {
      
      let newValue: number = newSkills.get(k) || 0;

      comparationMap.set(k, [
        v,
        newValue,
        v < newValue ? 0 : (v > newValue ? 2 : 1)
      ]);
    });

    return comparationMap;

  }
}
