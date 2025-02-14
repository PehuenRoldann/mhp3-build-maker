import { Component } from '@angular/core';
import { ArmorData } from './types/armorData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mhp3-build-maker';

  public partsForTheListToShow = "";
  currentView = "";

  public lastEquipedArmor: [string, ArmorData] | undefined;

  public showPartsHandler(data: string) {
    this.currentView = "list";
    this.partsForTheListToShow = data;
    console.log("Parts to show: " + this.partsForTheListToShow); //Debug
  }

  public changeToMainView(){
    this.currentView = "";
  }
}
