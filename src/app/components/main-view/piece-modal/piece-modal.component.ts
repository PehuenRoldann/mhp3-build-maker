import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArmorData } from '../../../types/armorData';

@Component({
  selector: 'app-piece-modal',
  templateUrl: './piece-modal.component.html',
  styleUrl: './piece-modal.component.scss'
})
export class PieceModalComponent {

  @Input() armor!: ArmorData | null;

  @Output() changeEventEmitter = new EventEmitter();
  @Output() removeEventEmitter = new EventEmitter();

  public onChangePressed() {
    return this.changeEventEmitter.emit();
  }

  public onRemovePressed() {
    return this.removeEventEmitter.emit();
  }

}
