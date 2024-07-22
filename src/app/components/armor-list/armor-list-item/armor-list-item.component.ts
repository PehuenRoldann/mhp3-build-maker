import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ArmorData } from '../../../types/armorData';
import { DataFormatService } from '../../../services/data-format.service';
// import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-armor-list-item',
  templateUrl: './armor-list-item.component.html',
  styleUrl: './armor-list-item.component.scss'
})
export class ArmorListItemComponent implements OnInit {

  @Input({ required: true }) item!: ArmorData;
  skillsMap: [string, number][] | undefined;

  @Output() equipEvent: EventEmitter<ArmorData> = new EventEmitter();

  ngOnInit(): void {
    let service = new DataFormatService();

    this.skillsMap = service.getSkillsArray(this.item.skills);
  }

  public onEquipBtnClick() {

    // let service = new LocalStorageService(); // Should be handled by the list (parent)
    // service.setItem('helmet', this.item);
    return this.equipEvent.emit(this.item);
  }

}
