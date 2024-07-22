import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArmorData } from '../../types/armorData';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})


export class MainViewComponent implements OnInit {

  @Output() showPartsListEvent = new EventEmitter<string>();
  
  public EquipedArmor: Array<ArmorData | null> = new Array<ArmorData | null>(5);

  public selectPart(value: string) {

    // console.log("showPartsEvent emited"); // Debug
    this.showPartsListEvent.emit(value);
  }

  public UpdateArmor () {

    let parts = ['helmet', 'plate', 'guantlets', 'waist', 'leggings'];
    let service = new LocalStorageService();
    
    this.EquipedArmor[0] = service.getItem('helmet') ? service.getItem('helmet') : null;
    this.EquipedArmor[1] = service.getItem('plate') ? service.getItem('plate') : null;
    this.EquipedArmor[2] = service.getItem('guantlets') ? service.getItem('guantlets') : null;
    this.EquipedArmor[3] = service.getItem('waist') ? service.getItem('waist') : null;
    this.EquipedArmor[4] = service.getItem('leggings') ? service.getItem('leggings') : null;
    console.log("Equiped armor:");
    console.log(this.EquipedArmor);
  }

  ngOnInit(): void {
    this.UpdateArmor();
  }

  @Input() set Armor (data: [string, ArmorData]) { // Remove?
    
    switch(data[0]){

      case 'helmets':
        this.EquipedArmor[0] = data[1];
        break;
      case 'plates':
        this.EquipedArmor[1] = data[1];
        break;
      case 'guantlets':
        this.EquipedArmor[2] = data[1];
        break;
      case 'waists':
        this.EquipedArmor[3] = data[1];
        break;
      case 'leggings':
        this.EquipedArmor[4] = data[1];
        break;
    }
    console.log("Equiped armor:");
    console.log(this.EquipedArmor);
  }
}
