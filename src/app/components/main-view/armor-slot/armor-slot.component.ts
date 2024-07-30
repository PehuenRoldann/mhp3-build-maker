import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ArmorData } from '../../../types/armorData';

@Component({
  selector: 'app-armor-slot',
  templateUrl: './armor-slot.component.html',
  styleUrl: './armor-slot.component.scss'
})
export class ArmorSlotComponent implements OnInit, OnChanges {

  @Input({required: true}) bodyPart: string = "";
  @Input({required: true}) rare: number = 1;
  @Input({required: true}) name: string = "";
  @Input({required: true}) _class: number = 0;
  @Input() done: boolean = false;

  @Output() pressedArmorSlotEvent = new EventEmitter<string>();

  imageUrl: string = '';

  ngOnInit() {
    this.updateImageUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImageUrl();
  }

  public onCheckBoxChange(event: any) {
    if (event.target.checked) {
      this.done = true;
    }
    else {
      this.done = false;
    }
  }
  
  private updateImageUrl() {
    this.imageUrl = `../../../../../assets/ArmorIcons/${this.bodyPart}/rare${this.rare}.png`;
  }

  public pressedArmorSlot () {
    this.pressedArmorSlotEvent.emit(this.bodyPart);
  }
}
