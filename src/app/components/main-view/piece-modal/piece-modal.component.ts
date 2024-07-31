import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ArmorData } from '../../../types/armorData';

@Component({
  selector: 'app-piece-modal',
  templateUrl: './piece-modal.component.html',
  styleUrl: './piece-modal.component.scss'
})
export class PieceModalComponent implements OnChanges {
  

  @Input() armor: ArmorData | null = null;
  @Input() bodyPart: string = "helmet";
  public imgPath = "";

  @Output() changeEventEmitter = new EventEmitter();
  @Output() removeEventEmitter = new EventEmitter();


  ngOnChanges(changes: SimpleChanges): void {
    if (this.armor){
      this.loadImage();
    }
    
  }

  public onChangePressed() {
    return this.changeEventEmitter.emit();
  }

  public onRemovePressed() {
    return this.removeEventEmitter.emit();
  }

  private loadImage() {
    // Find the path to the img
    let imgFix = "";
    switch (this.bodyPart){
      case 'helmets':
        imgFix = 'helmet';
        break;
      case 'plates':
        imgFix = 'plates';
        break;
      case 'waists':
        imgFix = 'waist';
        break;
      default:
        imgFix = this.bodyPart;
        break;
    }
    
    // console.log("armor rare: " + this.armor!.rare); // Debug
    this.imgPath = `../../../../../assets/ArmorIcons/${imgFix}/rare${this.armor!.rare}.png`;
  }

}
