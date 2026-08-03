import { Routes } from '@angular/router';
import { SuperHeroesTable } from './components/super-heroes-table/super-heroes-table.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';

export const routes: Routes = [
  {
    path: '',
    component: SuperHeroesTable,
  },
  {
    path: 'add-hero',
    component: AddHeroComponent,
  },
  {
    path: 'edit-hero',
    component: AddHeroComponent,
    data: {}
  },
  {
    path: '**',
    redirectTo: '',
  },
];