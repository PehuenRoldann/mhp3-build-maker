import { Component, Input } from '@angular/core';
import { ArmorData } from '../../../types/armorData';

@Component({
  selector: 'app-armor-set-modal',
  templateUrl: './armor-set-modal.component.html',
  styleUrl: './armor-set-modal.component.scss'
})
export class ArmorSetModalComponent {

  @Input({required: true}) equipedArmor!: Map<string, ArmorData>;
}
