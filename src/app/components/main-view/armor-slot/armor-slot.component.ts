import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
  @Input({required: true}) _class: number | null = null;

  @Output() pressedArmorSlotEvent = new EventEmitter<string>();
  @Output() checkBoxChangeEvent = new EventEmitter<boolean>();

  constructor( private cd: ChangeDetectorRef ) {}

  imageUrl: string = '';

  ngOnInit() {
    this.updateImageUrl();
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImageUrl();
    this.cd.detectChanges();
  }

  public onCheckBoxChange(event: any) {

    return this.checkBoxChangeEvent.emit(event.target.checked);
  }
  
  private updateImageUrl() {
    this.imageUrl = `../../../../../assets/ArmorIcons/${this.bodyPart}/rare${this.rare}.png`;
  }

  public pressedArmorSlot () {
    this.pressedArmorSlotEvent.emit(this.bodyPart);
  }
}
