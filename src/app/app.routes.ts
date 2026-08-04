import { Routes } from '@angular/router';
import { SuperHeroesTable } from './components/super-heroes-table/super-heroes-table.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';

export const routes: Routes = [
  {
    path: '',
    component: SuperHeroesTable,
  },
  {
    path: 'add-super-hero',
    component: AddHeroComponent,
  },
  {
    path: 'edit-super-hero/:id',
    component: EditHeroComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
