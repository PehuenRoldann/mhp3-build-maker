import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Module to get the size screen

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {

  private isMobile = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobile.asObservable();

  private isScreenSizeAvailable () { // To check if the code is running on a browser
    return typeof window !== 'undefined';
  }

  constructor() {
    if (this.isScreenSizeAvailable()) {
      this.checkScreenSize();
      window.addEventListener('resize', this.checkScreenSize.bind(this));
    }
  }

  private checkScreenSize() {
    const mobile = window.innerWidth <= 768; // Define el ancho para mobile
    this.isMobile.next(mobile);
  }


}
