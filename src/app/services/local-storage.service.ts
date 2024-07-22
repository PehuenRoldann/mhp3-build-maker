import { Injectable } from '@angular/core';
import { ArmorData } from '../types/armorData';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Set a value in local storage
  setItem(key: string, value: ArmorData): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from local storage
  getItem(key: string): ArmorData | null {
    let item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
