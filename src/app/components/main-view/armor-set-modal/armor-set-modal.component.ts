import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ArmorData } from '../../../types/armorData';

@Component({
  selector: 'app-armor-set-modal',
  templateUrl: './armor-set-modal.component.html',
  styleUrl: './armor-set-modal.component.scss'
})
export class ArmorSetModalComponent{

  @Input({required: true}) equipedArmor: Map<string, ArmorData> = new Map<string, ArmorData> ();
  public equipedArmorLocal: Map<string, ArmorData> = new Map<string, ArmorData> ();
  public equipedArmorKeys: string[] = [];

  constructor(private cd:ChangeDetectorRef){}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['equipedArmor'])  {
      console.log('Change on equiped ARmor: ');
      console.log(this.equipedArmor);
      this.equipedArmorKeys = Array.from(this.equipedArmor.keys());
    }

    //this.cd.detectChanges();
  } 

}
