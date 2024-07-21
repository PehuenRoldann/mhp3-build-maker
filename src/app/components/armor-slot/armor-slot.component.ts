import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-armor-slot',
  templateUrl: './armor-slot.component.html',
  styleUrl: './armor-slot.component.scss'
})
export class ArmorSlotComponent implements OnInit {

  @Input({required: true}) bodyPart: string = "helmet" || "plate" || "guantlets" || "waist" || "leggings";
  @Input({required: true}) rare: number = 2;
  @Input() done: boolean = false;

  imageUrl: string = '';

  ngOnInit() {
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
}
