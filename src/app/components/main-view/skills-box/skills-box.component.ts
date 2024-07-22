import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills-box',
  templateUrl: './skills-box.component.html',
  styleUrl: './skills-box.component.scss'
})
export class SkillsBoxComponent implements OnInit{


  // Hash map with the skills an its values
  @Input() skills: Map<string,number> = new Map<string,number>();

  get skillsArray() {
    // console.log(Array.from(this.skills.entries())); DEBUG
    return Array.from(this.skills.entries());
  }

  isPositive = (num: number): boolean => {
    // console.log(num > 0); #DEBUG
    return num > 0;
  }

  ngOnInit(): void {
    this.skills.set("Attack", 10);
    this.skills.set("Sharpener", 15);
    this.skills.set("Poison", -5);
    this.skills.set("Musician", -20);
  }

}
