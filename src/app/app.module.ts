import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ArmorSlotComponent } from './components/main-view/armor-slot/armor-slot.component';
import { StatsBoxComponent } from './components/main-view/stats-box/stats-box.component';
import { SkillsBoxComponent } from './components/main-view/skills-box/skills-box.component';
import { ResourcesBoxComponent } from './components/main-view/resources-box/resources-box.component';

import { FormsModule } from '@angular/forms';
import { ArmorListComponent } from './components/armor-list/armor-list.component';
import { ArmorListItemComponent } from './components/armor-list/armor-list-item/armor-list-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PieceModalComponent } from './components/main-view/piece-modal/piece-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ArmorSlotComponent,
    StatsBoxComponent,
    SkillsBoxComponent,
    ResourcesBoxComponent,
    ArmorListComponent,
    ArmorListItemComponent,
    PieceModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
