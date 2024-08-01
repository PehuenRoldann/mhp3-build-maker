import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { ArmorData } from '../../../types/armorData';
import { DataFormatService } from '../../../services/data-format.service';

@Component({
  selector: 'app-resources-box',
  templateUrl: './resources-box.component.html',
  styleUrl: './resources-box.component.scss'
})
export class ResourcesBoxComponent implements  OnChanges {
  

  @Input() armor: Array<ArmorData | null> = [];
  resources: Map<string, number> = new Map<string,number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.resources = new Map<string,number>();
    this.updateResources();
  }


  private updateResources () {

    let service = new DataFormatService();
    
    if (this.armor.length > 0) {

      this.armor.forEach(element => {

        if (element) {
          
          let currentResources = service.getResourcesMap(element!.materials);

          currentResources.forEach((v, k) => {

            if (this.resources.has(k)) {
              this.resources.set(k, v + this.resources.get(k)!);
            }
            else {
              this.resources.set(k, v);
            }

          })
        }

        
      });
    }
  }




}
