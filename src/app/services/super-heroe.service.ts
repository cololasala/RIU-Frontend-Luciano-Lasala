import { Injectable, signal } from '@angular/core';
import { ISuperHeroe } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class SuperHeroeService {
  superHeroes = signal<ISuperHeroe[]>([
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

  getSuperHeroes(): ISuperHeroe[] {
    return this.superHeroes();
  }

  getSuperHeroeById(superHeroeId: number): ISuperHeroe | undefined {
    return this.getSuperHeroes().find((data) => data.id === superHeroeId);
  }

  getSuperHeroeByName(superHeroeName: string): ISuperHeroe[] | [] {
    return this.getSuperHeroes().filter((data) => data.name.includes(superHeroeName));
  }

  createSuperHeroe(superHeroe: ISuperHeroe): ISuperHeroe[] {
    this.superHeroes.update((superHeroes) => [...superHeroes, superHeroe]);

    return this.superHeroes();
  }

  updateSuperHero(superHeroeUpdated: ISuperHeroe): ISuperHeroe[] {
    this.superHeroes.update((superHeroes) =>
      superHeroes.map((superHeroe) =>
        superHeroe.id === superHeroeUpdated.id ? superHeroeUpdated : superHeroe,
      ),
    );

    return this.superHeroes();
  }

  deleteSuperHeroe(superHeroeiId: number): ISuperHeroe[] {
    this.superHeroes.update((superHeroes) =>
      superHeroes.filter((superHero) => superHero.id !== superHeroeiId),
    );

    return this.superHeroes();
  }
}
