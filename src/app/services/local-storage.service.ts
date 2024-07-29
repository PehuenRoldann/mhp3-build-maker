import { Injectable } from '@angular/core';
import { ArmorData } from '../types/armorData';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  // Set a value in local storage
  setItem(key: string, value: ArmorData): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn('localStorage is not available');
    }
  }

  // Get a value from local storage
  getItem(key: string): ArmorData | null {
    if (this.isLocalStorageAvailable()) {
      let item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } else {
      console.warn('localStorage is not available');
      return null;
    }
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    } else {
      console.warn('localStorage is not available');
    }
  }

  // Clear all items from local storage
  clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    } else {
      console.warn('localStorage is not available');
    }
  }

  get currentEquipment () {

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
}
