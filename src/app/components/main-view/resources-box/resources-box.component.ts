import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArmorData } from '../../../types/armorData';
import { DataFormatService } from '../../../services/data-format.service';

@Component({
  selector: 'app-resources-box',
  templateUrl: './resources-box.component.html',
  styleUrl: './resources-box.component.scss'
})
export class ResourcesBoxComponent implements OnChanges {

  @Input() armor: Array<ArmorData | null> = [];

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  private updateResources () {

    let service = new DataFormatService();
  }




}
