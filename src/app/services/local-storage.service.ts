import { Injectable } from '@angular/core';
import { ArmorData } from '../types/armorData';
import { setMaxIdleHTTPParsers } from 'node:http';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private SETS_BOOK_KEY: string = 'mhp3-build-maker-sets-book';

  constructor() { }

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  // Set a value in local storage
  public setItem(key: string, value: ArmorData): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn('localStorage is not available');
    }
  }

  // Get a value from local storage
  public getItem(key: string): ArmorData | null {
    if (this.isLocalStorageAvailable()) {
      let item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      console.warn('localStorage is not available');
      return null;
    }
  }

  // Remove a value from local storage
  public removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    } else {
      console.warn('localStorage is not available');
    }
  }

  // Clear all items from local storage
  public clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    } else {
      console.warn('localStorage is not available');
    }
  }

  get currentEquipment (): Map<string, ArmorData> {

    let parts = ['helmet', 'plate', 'guantlets', 'waist', 'leggings'];

    let currentEquipment: Map<string, ArmorData> = new Map<string, ArmorData> ();

    parts.forEach(element => {
      let part: ArmorData | null = this.getItem(element);

      if (part !== null) {
        currentEquipment.set(element, part);
      }

    });

    return currentEquipment;

  }

  /**
   * Saves a set name in the SetsBook
   * @param setName Set name to save
   */
  private setSetsNames(setName: string) {

    if (!this.isLocalStorageAvailable) {
      throw("Local storage is not available..");
    }

    let setsBook =  this.getSetsBook();

    setsBook.push(setName);
    localStorage.setItem(this.SETS_BOOK_KEY, JSON.stringify(setsBook));

  }

  private getSetsBook(): Array<string>{

    let setsBookStr =  localStorage.getItem(this.SETS_BOOK_KEY
    );

    if (!setsBookStr) {
      localStorage.setItem(this.SETS_BOOK_KEY, JSON.stringify([]));
    }

    setsBookStr =  localStorage.getItem(this.SETS_BOOK_KEY
    );
    return JSON.parse(setsBookStr!);
    
  }



  /**
   * Gets a set from the local storage
   * @param setName The set name to return
   * @returns A tupla like [setName: string, setData: Map<string,ArmorData>] or null if the set is not found.
   */
  private getSetFromStorage(setName: string): Map<string, ArmorData> | null { // Don't neet storage available because are not call for other object.

    const setStr = localStorage.getItem(setName);

    if (!setStr) {
      return null;
    }

    const parsedSetStr = JSON.parse(setStr);
    const setMap = new Map<string, ArmorData> (Object.entries(parsedSetStr));

    return setMap;
    
  }

  /**
   * Saves the current equiped set.
   * @param setName Name for the set.
   */
  /* public saveCurrentSet(setName: string) {

    if (this.isLocalStorageAvailable()) {

      if (!localStorage.getItem('mhp3-sets')){
        this.
      }
      localStorage.setItem(`mhp3-set:${setName}`, JSON.stringify(this.currentEquipment));
    } else {
      console.warn('localStorage is not available');
    }
  } */

  get savedSets(): Map<string, Map<string, ArmorData>> {

    if (!this.isLocalStorageAvailable) {
      throw("Local storage is not available..");
    }

    let setsBook = this.getSetsBook();

    let setsMap = new Map<string, Map<string, ArmorData>> ();

    setsBook.forEach(setName => {

      let armorSet = this.getSetFromStorage(setName);
      if (armorSet) {
        setsMap.set(setName, armorSet)
      }
    })

    return setsMap;
  }
}
