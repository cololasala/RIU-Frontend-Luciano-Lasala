import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ISuperHero } from '../../interfaces/interfaces';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-super-heroes-input-search-autocomplete',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './super-heroes-input-search-autocomplete.component.html',
  styleUrl: './super-heroes-input-search-autocomplete.component.css',
  standalone: true,
})
export class SuperHeroesInputSearchAutocompleteComponent {
  heroControl = new FormControl<string>({ value: '', disabled: false });
  allHeroes = input<ISuperHero[]>([]);
  selectedHero = output<string>();
  filteredHeroes: Observable<ISuperHero[]>;

  constructor() {
    this.filteredHeroes = this.checkSearch();

    this.heroControl.valueChanges.subscribe((heroName) => {
      if (heroName === '') {
        this.selectedHero.emit('');
      }
    });
  }

  onUpdateHeroes = effect(() => {
    this.allHeroes();
    this.heroControl.setValue('');
    if (this.allHeroes().length === 0) {
      this.heroControl.disable();
    }
    this.filteredHeroes = this.checkSearch();
  });

  checkSearch = () => {
    return this.heroControl.valueChanges.pipe(
      startWith(''),
      map((heroName) => this.filterHero(heroName || '')),
    );
  };

  filterHero(heroName: string): ISuperHero[] {
    const filterValue = heroName.toLowerCase();
    return this.allHeroes()!.filter((hero: ISuperHero) =>
      hero.name.toLowerCase()?.includes(filterValue),
    );
  }

  onSelected = (selectedHero: string) => {
    this.selectedHero.emit(selectedHero);
  };
}
