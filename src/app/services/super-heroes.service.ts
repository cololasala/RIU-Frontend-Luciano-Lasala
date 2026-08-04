import { Injectable, signal } from '@angular/core';
import { ISuperHero } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class SuperHeroesService {
  superHeroes = signal<ISuperHero[]>([
    {
      id: 1,
      name: 'Superman',
      power: 'Super fuerza, volar, rayo laser',
      description: 'El hombre de acero',
    },
    {
      id: 2,
      name: 'Batman',
      power: 'No tiene',
      description: 'Es el caballero de la noche',
    },
    {
      id: 3,
      name: 'Wonder Woman',
      power: 'Fuerza, agilidad',
      description: 'Es de las guerreras amazonas',
    },
    {
      id: 4,
      name: 'IronMan',
      power: 'Fuerza, vuela, es inteligente',
      description: 'Es ingeniero',
    },
  ]);

  getSuperHeroes(): ISuperHero[] {
    return this.superHeroes();
  }

  getSuperHeroeById(superHeroeId: number): ISuperHero | undefined {
    return this.getSuperHeroes().find((data) => data.id === superHeroeId);
  }

  getSuperHeroesByName(superHeroName: string): ISuperHero[] | [] {
    return this.getSuperHeroes().filter((data) =>
      data.name.toLocaleLowerCase().includes(superHeroName.toLocaleLowerCase()),
    );
  }

  createSuperHero(superHero: ISuperHero): ISuperHero {
    const newId = this.superHeroes().length + 1;
    const newSuperHero = { ...superHero, id: newId };
    this.superHeroes.update((superHeroes) => [...superHeroes, newSuperHero]);

    return newSuperHero;
  }

  updateSuperHero(superHeroUpdated: ISuperHero): ISuperHero {
    this.superHeroes.update((superHeroes) =>
      superHeroes.map((superHeroe) =>
        superHeroe.id === superHeroUpdated.id ? superHeroUpdated : superHeroe,
      ),
    );

    return superHeroUpdated;
  }

  deleteSuperHero(superHeroId: number): void {
    this.superHeroes.update((superHeroes) =>
      superHeroes.filter((superHero) => superHero.id !== superHeroId),
    );
  }
}
