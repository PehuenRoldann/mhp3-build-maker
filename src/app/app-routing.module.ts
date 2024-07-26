import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ArmorListComponent } from './components/armor-list/armor-list.component';

const routes: Routes = [
  {path: 'home', component: MainViewComponent},
  {path: 'list/:parts', component: ArmorListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
