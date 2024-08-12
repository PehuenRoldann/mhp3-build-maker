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
   * Saves a set name in the SetsBook to be found later.
   * @param setName Set name to save
   */
  private saveSetName(setName: string) {

    if (!this.isLocalStorageAvailable) {
      throw("Local storage is not available..");
    }

    let setsBook =  this.getSetsBook();

    // Checks if the name isn't already registered, in case of overwrited sets.
    if (!setsBook.includes(setName)) {
      setsBook.push(setName);
      localStorage.setItem(this.SETS_BOOK_KEY, JSON.stringify(setsBook));
    }

  }

  /**
   * The SetsBooks array saves all names (keys) of the users sets.
   * @returns Array with the sets names (keys) to find them.
   */
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

    const parsedArrSet: [string, ArmorData][] = JSON.parse(setStr);
    const setMap = new Map<string, ArmorData> (parsedArrSet);

    return setMap;
    
  }


  /**
   * Saves a new set in the local storage.
   * @param setName Name for the new set. Should be unique.
   * @param setData Set armor data.
   */
  public saveSet(setName: string, setData: Map<string, ArmorData>) {

    if (!this.isLocalStorageAvailable) {
      throw('Local storage is not available!');
    }

    setName = setName.toLocaleLowerCase();
    this.saveSetName(setName); // Saves the set key in the book to search later
    
    const setArray = Array.from(setData.entries());
    console.log("Guardando: " + JSON.stringify(setArray));
    localStorage.setItem(setName, JSON.stringify(setArray)); // Saves set into the local storage
  }

  public getSavedSets(): [string, Map<string, ArmorData>][] {

    if (!this.isLocalStorageAvailable) {
      throw("Local storage is not available..");
    }

    let setsBook = this.getSetsBook();

    let setsArr: [string, Map<string, ArmorData>][] = [];

    setsBook.forEach(setName => {

      let armorSet = this.getSetFromStorage(setName);
      if (armorSet) {
        setsArr.push([setName, armorSet]);
      }
    })

    return setsArr;
  }

  public removeSet(setName: string) {

    let setsBook = this.getSetsBook();

    setsBook.splice(setsBook.indexOf(setName), 1);
    localStorage.setItem(this.SETS_BOOK_KEY, JSON.stringify(setsBook));
  }

  /**
   * Checks if there is not a set with the given name.
   * @param setName Name to search
   * @returns TRUE if the name is available, FALSE if not.
   */
  public isSetNameAvailable(setName: string): boolean {

    let nameUsed = false;

    for (let set of this.getSetsBook()) {

      if(setName.toLocaleLowerCase() === set) {
        nameUsed = true;
      }
    }

    return !nameUsed;
  }
}
