import { Routes } from '@angular/router';
import { SuperHeroesTable } from './components/super-heroes-table/super-heroes-table.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';

export const routes: Routes = [
  {
    path: '',
    component: SuperHeroesTable,
  },
  {
    path: 'add-super-heroe',
    component: AddHeroComponent,
  },
  {
    path: 'edit-super-heroe/:id',
    component: AddHeroComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
