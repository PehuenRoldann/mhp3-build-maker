import { Component, Input, OnInit } from '@angular/core';
import { ArmorData } from '../../../types/armorData';
import { DataFormatService } from '../../../services/data-format.service';

@Component({
  selector: 'app-armor-list-item',
  templateUrl: './armor-list-item.component.html',
  styleUrl: './armor-list-item.component.scss'
})
export class ArmorListItemComponent implements OnInit {

  @Input({ required: true }) item!: ArmorData;
  skillsMap: [string, number][] | undefined;

  ngOnInit(): void {
    let service = new DataFormatService();

    this.skillsMap = service.getSkillsArray(this.item.skills);
  }

}
