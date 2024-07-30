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
        // console.log("Equiped " + k);
        // console.log(v)
        compatibility = piece.class == v.class || v.class > 1 || piece.class > 1;
        // console.log(`Compatiblity for ${k}: ${compatibility}`); // Debug
      }

    });

    return compatibility;
    
  }
}
